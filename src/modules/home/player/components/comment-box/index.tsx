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
import {
  DISABLE_LOADING,
  ENABLE_LOADING,
} from '../../../../../redux/modules/loading/actions';

interface Props extends StateProps, DispatchProps {
  music_id: number;
}

const mapStateToProps = (state: any) => ({
  access_token: state.auth.access_token,
  display_name: state.auth.display_name,
  image_url: state.auth.image_url,
  default_avatar: state.auth.default_avatar,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    enableLoading: () => dispatch({type: ENABLE_LOADING}),
    disableLoading: () => dispatch({type: DISABLE_LOADING}),
  };
};

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
    props.enableLoading();
    fetchComment(music_id)
      .then((data) => {
        const formattedComments = data.comments.map((e) => ({
          content: e.content,
          display_name: e.display_name,
          created_at: formatYYYYMMDD(new Date(parseInt(e.created_at))),
          default_avatar: e.default_avatar,
          image_url: e.image_url,
        }));
        console.log(formattedComments);
        setComments(formattedComments);
        props.disableLoading();
      })
      .catch((err) => {
        console.log(err);
        setError(I18n.translate('player.comment-error'));
        props.disableLoading();
      });
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
                  {comments && comments.length ? (
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

                      <View>
                        <IconButton
                          icon={SendSvg}
                          onClick={() => handleSendComment(commentField)}
                        />
                      </View>
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
    console.log(isShow)
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
          if (response.commentSong) {
            setComments([...comments, comment]);
            postComment(props.music_id, comment);
            setCommentField('');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
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
      </KeyboardAvoidingView>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
