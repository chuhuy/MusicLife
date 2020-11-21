import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { styleVars } from './../../../../shared/constance/style-variables';
import Shuffle from './../../../../assets/icons/shuffle.svg';
import Repeat from './../../../../assets/icons/repeat.svg';

interface Props {
    mode: 'shuffle' | 'repeat',
    onClick: () => void
}

const PlaybackMode: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Pressable
            style={styles.container}
            onPressOut={props.onClick}>
                {props.mode === 'shuffle' ? <Shuffle width={25} height={25}/> : <Repeat width={25} height={25}/>}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: styleVars.secondaryColor,
    },
});

export default PlaybackMode;
