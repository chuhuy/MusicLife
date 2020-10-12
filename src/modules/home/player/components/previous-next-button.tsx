import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface Props {
    type: 'previous' | 'next',
    onClick: () => void
}

const PreviousNextButton: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                <View>
                    <Text style={styles.icon}>{props.type === 'previous' ? 'Previous' : 'Next'}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#00132B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
    },
});

export default PreviousNextButton;
