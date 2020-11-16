import React from 'react';
import { Image, Text, StyleSheet, Pressable, View } from 'react-native';
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
    
    const getStyleClass = () => {
        if (size === 2)
            return styles.flexContainer;
        
        if (size) return styles.smallContainer;
    }
    
    return (
        <>
            <Pressable
                style={[styles.container, getStyleClass()]}
                onPress={onClick}
            >
                <Image style={[styles.image]} source={{uri: image}}/>
                <Text style={styles.name} numberOfLines = {1} >{name}</Text>
                {artist && <Text style={styles.artist} numberOfLines = {1} >{artist}</Text>}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 130,
        paddingHorizontal: 10
    },
    smallContainer: {
        width: 110,
    },
    flexContainer: {
        width: '47%',
        paddingHorizontal: 0,
        paddingVertical: 15
    },
    image: {
        paddingTop: '100%',
        width: '100%',
        borderRadius: 10,
    },
    name: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginTop: 8,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    }
});

