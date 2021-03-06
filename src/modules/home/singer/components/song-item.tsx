import React from 'react';
import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
import { styleVars } from './../../../../shared/constance/style-variables';
import { IconButton } from '../../../../shared/components';
import OptionIcon from './../../../../assets/icons/option.svg';
interface Props {
    name: string,
    artist: string,
    onClick: () => void,
    image: string,
    onOptionClick: () => void,
}
export const SongItem: React.FunctionComponent<Props> = (props: Props) => {
    const {
        name,
        artist,
        onClick,
        image,
        onOptionClick,
    } = props;

    return (
        <>
            <View style={styles.container}>
                <Pressable
                    onPress={onClick}
                    style={styles.song}
                >
                    <Image source={{uri: image}} style={styles.img}/>
                    <View style={styles.songContent}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.artist}>{artist}</Text>
                    </View>
                </Pressable>
                <View style={styles.option}>
                    <IconButton onClick={onOptionClick} icon={OptionIcon}/>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    song: {
        flexDirection: 'row',
    },
    songContent: {
        marginLeft: 10,
    },
    name: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize,
    },
    img: {
        width: 50,
        height: 50,
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
