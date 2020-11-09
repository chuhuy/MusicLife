/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { styles } from './styles';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PreviousIcon from './../../../assets/icons/previous-active.svg';
import NextIcon from './../../../assets/icons/next-active.svg';
import PlayIcon from './../../../assets/icons/play.svg';
import PauseIcon from './../../../assets/icons/pause-active.svg';
import { IconButton } from '../../../shared/components';
import { useNavigation } from '@react-navigation/native';
import { Song } from '../../../models/song';
import { SKIP } from '../../../redux/modules/player/actions';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { PLAY, PAUSE } from './../../../redux/modules/player/actions';


interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveSongToStore: (song: Song) => dispatch({type: SKIP, payload: song}),
        playMusic: () => dispatch({type: PLAY}),
        pauseMusic: () => dispatch({type: PAUSE}),
    };
};
const mapStateToProps = (state: any) => ({
    song: state.player,
});

const Controller: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();

    const handlePrevious = () => {
        TrackPlayer.skipToPrevious()
        .then(() => {
            TrackPlayer.play()
            .then(() => {props.playMusic()})
            .catch((error) => console.log(error));;
        })
        .catch((e) => {
            console.log(e);
            TrackPlayer.seekTo(0);
            TrackPlayer.play()
            .then(() => {props.playMusic()})
            .catch((error) => console.log(error));;
        });
    };
    const handlePlayPause = () => {
        console.log(props.song.isPlaying)
        if (props.song.isPlaying) {
            TrackPlayer.pause()
            .then(() => {props.pauseMusic()})
            .catch((error) => console.log(error));
        } else {
            TrackPlayer.play()
            .then(() => {props.playMusic()})
            .catch((error) => console.log(error));;
        }
    };
    const handleNext = () => {
        TrackPlayer.skipToNext()
        .then(() => {
            TrackPlayer.play()
            .then(() => {props.playMusic()})
            .catch((error) => console.log(error));;
        })
        .catch((e) => {
            console.log(e);
            TrackPlayer.pause()
            .then(() => {props.pauseMusic()})
            .catch((error) => console.log(error));
        });
    };
    const handleOnClick = () => {
        if(props.song.id !== '') navigation.navigate('Player');
    };

    return props.song.image_url ? (
        <TouchableOpacity
            style={styles.view}
            activeOpacity={1}
            onPress={() => handleOnClick()}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.image} source={{uri: props.song.image_url}}/>
                    <View style={styles.titleGroup}>
                        <Text style={styles.song}>{props.song.title}</Text>
                        <Text style={styles.artist}>{props.song.artist}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.button}>
                        <IconButton icon={PreviousIcon} onClick={() => handlePrevious()}/>
                    </View>
                    <View style={styles.button}>
                        <IconButton icon={props.song.isPlaying ? PauseIcon : PlayIcon} onClick={() => handlePlayPause()}/>
                    </View>
                    <View style={styles.button}>
                        <IconButton icon={NextIcon} onClick={() => handleNext()}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    ) : (<></>);
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
