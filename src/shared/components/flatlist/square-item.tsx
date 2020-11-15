import React from 'react';
import { Image, Text, StyleSheet, Pressable } from 'react-native';
import { styleVars } from '../../constance/style-variables';

interface Props {
    name: string,
    artist?: string,
    onClick: () => void,
    image: string,
    size?: number,
}

export const SquareItem: React.FunctionComponent<Props> = (props: Props) => {
    const {name, artist, onClick, image, size} = props;
    
    return (
        <>
            <Pressable
                style={[styles.container, size ? styles.smallContainer : undefined]}
                onPress={onClick}
            >
                <Image style={[styles.image, size ? styles.smallImage : undefined]} source={{uri: image}}/>
                <Text style={styles.name} numberOfLines = {1} >{name}</Text>
                {artist && <Text style={styles.artist} numberOfLines = {1} >{artist}</Text>}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: 120,
    },
    smallContainer: {
        width: 100,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
    },
    smallImage: {
        height: 100,
        width: 100,
    },
    name: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginTop: 5,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    }
});

