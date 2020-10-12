import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface Props {
    mode: 'shuffle' | 'repeat',
    onClick: () => void
}

const PlaybackMode: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                <View>
                    <Text style={styles.icon}>{props.mode === 'shuffle' ? 'Shuffle' : 'Repeat'}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#F34E5F',
    },
});

export default PlaybackMode;
