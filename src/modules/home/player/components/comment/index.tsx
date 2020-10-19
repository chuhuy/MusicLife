import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';
import ArrowUp from './../../../../../assets/icons/arrow-up.svg';
import ArrowDown from './../../../../../assets/icons/arrow-down.svg';
import I18n from './../../../../../i18n';
import { IconButton } from './../../../../../shared/components';

interface Props {
}

const Comment: React.FunctionComponent<Props> = (props: Props) => {
    const [isShow, setShow] = useState<boolean>(false);

    const toggleShowComment = () => {
        setShow(!isShow);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.commentTitle}>{I18n.translate('player.comment')}</Text>
                    <IconButton icon={isShow ? ArrowDown : ArrowUp} onClick={() => toggleShowComment()} />                                      
                </View>
                {isShow && <View style={styles.body}>
                    <View style={styles.commentList}>

                    </View>
                    <TextInput
                        style={styles.commentInput}
                        placeholderTextColor="#868686"
                        onChangeText={() => {}}
                        placeholder={I18n.translate('player.comment-placeholder')}/>
                </View>}
            </View>
        </>
    );
};

export default Comment;
