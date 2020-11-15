import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from '../icon-button';
import Option from '../../../assets/icons/option.svg';
import { styleVars } from '../../constance/style-variables';

interface Props {
    onOptionClick: () => void
    onClick: () => void
    image: string
    name: string
    artist?: string
}

export const Item: React.FunctionComponent<Props> = (props: Props) => {
    const {onOptionClick, onClick, image, name, artist} = props;
    return (
        <>
            <View style={styles.container} >
                <Pressable
                    style={styles.touchAreaOne}
                    onPress={onClick}
                >
                    <View style={styles.metadata} >
                        <Image source={{uri: image}} style={styles.image} />
                        <View style={styles.titleGroup}>
                            <Text style={styles.title}>{name}</Text>
                            {artist && <Text style={styles.artist}>{artist}</Text>}
                        </View>
                    </View>
                </Pressable>
                <View style={styles.touchAreaTwo}>
                    <IconButton icon={Option} onClick={onOptionClick} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 15,
    },
    metadata: {
        flex: 1,
        flexDirection: 'row',
    },
    touchAreaOne: {
        flex: 1,
    },
    touchAreaTwo: {
        justifyContent: 'center',
        marginRight: 10,
    },
    image: {
        height: 60,
        width: 60,
    },
    titleGroup: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize,
    },
});
