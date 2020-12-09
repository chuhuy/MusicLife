/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import {fetchComment} from '../../../../../api/explore';
import ErrorIcon from '../../../../../assets/icons/error.svg';
import I18n from '../../../../../i18n';
import {Comment} from '../../../../../models/comment';
import {
  Button,
  IconButton,
  LoadingLayer,
  NotFoundItem,
} from '../../../../../shared/components';
import {styleVars} from '../../../../../shared/constance/style-variables';
import CommentList from '../comment-list';
import ArrowDown from './../../../../../assets/icons/arrow-down.svg';
import ArrowUp from './../../../../../assets/icons/arrow-up.svg';
import SendSvg from './../../../../../assets/icons/send.svg';
import NotFoundComment from './../../../../../assets/icons/not-found-comment.svg';
import {styles} from './styles';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../../../../../shared/constance/screen';
import {
  connectSocket,
  disconnectSocket,
  postComment,
  subscribeSong,
} from './../../../../../services/socket';
import {formatYYYYMMDD} from './../../../../../shared/helper/dateTime';
import {commentSong} from './../../../../../api/personal';

interface Props extends StateProps {
  music_id: number;
}

const mapStateToProps = (state: any) => ({
  access_token: state.auth.access_token,
  display_name: state.auth.display_name,
  image_url: state.auth.image_url,
  default_avatar: state.auth.default_avatar,
});

const CommentBox: React.FunctionComponent<Props> = (props: Props) => {
  const {music_id, access_token} = props;
  const navigation = useNavigation();

  const [isShow, setShow] = useState<boolean>(false);
  const [commentField, setCommentField] = useState<string>('');
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  subscribeSong((data) => {
    console.log(data);
    setComments([...comments, data.comment]);
  });
  useEffect(() => {
    connectSocket(music_id);
    // fetchComment(music_id)
    //   .then((data) => {
    //     setComments(data.comments);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(I18n.translate('player.comment-error'));
    //     setIsLoading(false);
    //   });
  }, []);

  const handleSignIn = () => {
    navigation.navigate(Screen.Authentication.Login);
  };

  const renderContentBox = () => {
    return (
      <>
        {isLoading ? (
          <LoadingLayer />
        ) : (
          <>
            <View style={styles.body}>
              {error ? (
                <NotFoundItem icon={<ErrorIcon />} text={error} />
              ) : (
                <>
                  {comments.length ? (
                    <View style={styles.commentList}>
                      <CommentList comments={comments} />
                    </View>
                  ) : (
                    <NotFoundItem
                      icon={<NotFoundComment />}
                      text={I18n.translate('player.not-found-comment')}
                    />
                  )}

                  {access_token ? (
                    <View style={styles.commentInput}>
                      <TextInput
                        placeholderTextColor={styleVars.greyColor}
                        style={styles.input}
                        value={commentField}
                        onChangeText={handleChangeComment}
                        placeholder={I18n.translate(
                          'player.comment-placeholder',
                        )}
                      />

                      <IconButton
                        icon={SendSvg}
                        onClick={() => handleSendComment(commentField)}
                      />
                    </View>
                  ) : (
                    <View style={styles.loginButton}>
                      <Button
                        title={I18n.translate('setting.signin')}
                        onClick={handleSignIn}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </>
    );
  };

  const toggleShowComment = () => {
    setShow(!isShow);
  };

  const handleChangeComment = (value) => {
    setCommentField(value);
  };

  const handleSendComment = (content: string) => {
    if (content !== '') {
      const time = new Date(Date.now());
      const comment: Comment = {
        content: content,
        display_name: props.display_name,
        created_at: formatYYYYMMDD(time),
        default_avatar: props.default_avatar,
        image_url: props.image_url,
        access_token: props.access_token,
      };
      commentSong(comment.content, props.music_id, props.access_token)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      setComments([...comments, comment]);
      postComment(props.music_id, comment);
      setCommentField('');
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.commentTitle}>
              {I18n.translate('player.comment')}
            </Text>

            <IconButton
              icon={isShow ? ArrowDown : ArrowUp}
              onClick={toggleShowComment}
            />
          </View>

          {isShow && renderContentBox()}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default connect(mapStateToProps, null)(CommentBox);

type StateProps = ReturnType<typeof mapStateToProps>;
