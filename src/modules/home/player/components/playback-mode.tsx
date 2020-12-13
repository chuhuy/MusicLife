import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { styleVars } from './../../../../shared/constance/style-variables';
import Shuffle from './../../../../assets/icons/shuffle.svg';
import Repeat from './../../../../assets/icons/repeat.svg';
import ShuffleDefault from '../../../../assets/icons/shuffle-default.svg';
import RepeatDefault from '../../../../assets/icons/repeat-default.svg';

interface Props {
    mode: 'shuffle' | 'repeat',
    isActive?: boolean,
    onClick: () => void
}

const PlaybackMode: React.FunctionComponent<Props> = (props: Props) => {
    const {
        mode,
        isActive = false,
        onClick,
    } = props;
    
    const renderShuffle = () => {
        return (
            isActive ? <Shuffle width={25} height={25}/> : <ShuffleDefault width={25} height={25}/>
        )
    };

    const renderRepeat = () => {
        return (
            isActive ? <Repeat width={25} height={25}/> : <RepeatDefault width={25} height={25}/>
        );
    };


    return (
        <>
            <Pressable
                style={styles.container}
                onPress={onClick}>
                {mode === 'shuffle' ? renderShuffle() : renderRepeat()}
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
