import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

interface Props {
    title: string,
    onClick: () => void,
    image: string
}

export const PlaylistItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPressOut={props.onClick}>
                <Image style={styles.image} source={{uri: props.image}}/>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 15,
        color: '#FFFFFF',
    },
});
