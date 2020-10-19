import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import ArrowUp from './../../../../../assets/icons/arrow-up.svg';
import ArrowDown from './../../../../../assets/icons/arrow-down.svg';
import I18n from './../../../../../i18n';
import { IconButton } from './../../../../../shared/components';
import SendSvg from './../../../../../assets/icons/send.svg';

interface Props {
}

const Comment: React.FunctionComponent<Props> = (props: Props) => {
    const [isShow, setShow] = useState<boolean>(false);

    const toggleShowComment = () => {
        setShow(!isShow);
    };
    const handleSendComment = () => {};

    return (
        <>
            <KeyboardAvoidingView
                behavior="position">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.commentTitle}>{I18n.translate('player.comment')}</Text>
                        <IconButton icon={isShow ? ArrowDown : ArrowUp} onClick={() => toggleShowComment()}/>
                    </View>
                    {isShow && <View style={styles.body}>
                        <View style={styles.commentList} />
                        <View style={styles.commentInput}>
                            <TextInput
                                placeholderTextColor="#868686"
                                style={styles.input}
                                onChangeText={() => {}}
                                placeholder={I18n.translate('player.comment-placeholder')}/>
                            <IconButton icon={SendSvg} onClick={() => handleSendComment()} />
                        </View>
                    </View>}
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default Comment;
