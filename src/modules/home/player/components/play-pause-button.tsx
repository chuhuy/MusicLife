import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface Props {
    isPlaying: boolean,
    onClick: () => void
}

const PlayPauseButton: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                <View>
                    <Text style={styles.icon}>{props.isPlaying ? 'Pause' : 'Play'}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#00132B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
    },
});

export default PlayPauseButton;
