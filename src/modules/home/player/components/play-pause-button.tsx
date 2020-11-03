import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Play from './../../../../assets/icons/play.svg';
import Pause from './../../../../assets/icons/pause.svg';
import { styleVars } from './../../../../shared/constance/style-variables';

interface Props {
    isPlaying: boolean,
    onClick: () => void
}


const PlayPauseButton: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPressOut={props.onClick}>
                    {props.isPlaying ? <Pause height={30} width={30}/> : <Play height={30} width={30} marginLeft={5}/>}
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: styleVars.lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingLeft: 5,
    },
});

export default PlayPauseButton;
