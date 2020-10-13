import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Shuffle from './../../../../assets/icons/shuffle.svg';
import Repeat from './../../../../assets/icons/repeat.svg';

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
                {props.mode === 'shuffle' ? <Shuffle width={25} height={25}/> : <Repeat width={25} height={25}/>}
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
