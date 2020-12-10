import React, {useEffect, useRef} from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Comment } from '../../../../../models/comment';
import DefaultAvatar from '../../../setting/components/default-avatar';
import { styles } from './styles';

interface Props {
    comments: Array<Comment>
}

const CommentList: React.FC<Props> = (props: Props) => {
    const {comments} = props;
    const commentList = useRef();

    useEffect(() => {
        // commentList.current.scrollToEnd();
    }, []);

    return (
        <FlatList
            inverted
            ref={commentList}
            data={comments}
            renderItem={({item}) => {
                return (
                    <View style={styles.commentWrapper}>
                        {item.image_url === null ? (
                            <>
                                <DefaultAvatar size={45} type={item.default_avatar} />
                            </>
                            ) : (
                            <>
                                <Image source={{uri: item.image_url}} style={styles.avatar} />
                            </>
                        )}

                        <View style={styles.contentWrapper}>
                            <View style={styles.contentTop}>
                                <Text style={styles.name} numberOfLines={1}>
                                    {item.display_name}
                                </Text>

                                <Text style={styles.time}>
                                    {item.created_at}
                                </Text>
                            </View>

                            <Text style={styles.content}>
                                {item.content}
                            </Text>
                        </View>
                    </View>
                );
            }}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default CommentList;
