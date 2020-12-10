import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
            <Pressable
            style={styles.container}
            onPress={props.onClick}>
                    {props.isPlaying ? <Pause height={30} width={30}/> : <Play height={30} width={30} marginLeft={5}/>}
            </Pressable>
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
