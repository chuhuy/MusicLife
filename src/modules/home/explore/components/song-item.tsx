import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
    name: string,
    artist: string,
    onClick: () => void,
    image: string
}

export const SongItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPressOut={props.onClick}>
                <Image style={styles.image} source={{uri: props.image}}/>
                <View style={styles.titleColumn}>
                    <Text style={styles.song}>{props.name}</Text>
                    <Text style={styles.artist}>{props.artist}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: (width - 50) / 2,
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#00132B',
        marginRight: 10,
    },
    titleColumn: {
        height: 45,
        justifyContent: 'center',
        marginLeft: 5,
    },
    image: {
        height: 45,
        width: 45,
    },
    song: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    artist: {
        fontSize: 12,
        color: '#A7A7A7',
    },
});
