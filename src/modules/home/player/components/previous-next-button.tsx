import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Previous from './../../../../assets/icons/previous.svg';
import Next from './../../../../assets/icons/next.svg';

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
                {props.type === 'previous' ? <Previous width={20} height={20}/> : <Next width={20} height={20}/>}
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
