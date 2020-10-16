import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
    title: string,
    onClick: () => void,
    image: string
}

export const GenreItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPressOut={props.onClick}>
                <View style={styles.mask}/>
                <Image style={styles.image} source={{uri: props.image}}/>
                <View style={styles.mask}/>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
    },
    image: {
        height: 100,
        width: (width - 50) / 2,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
        position: 'absolute',
        marginTop: 45,
        alignSelf: 'center',
    },
    mask: {
        position: 'absolute',
        height: 100,
        width: (width - 50) / 2,
        backgroundColor: '#000000',
        opacity: 0.3,
    },
});
