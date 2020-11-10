/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Animated, Easing, Dimensions } from 'react-native';
import { styles } from './styles';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { PlayPauseButton, PreviousNextButton, PlaybackMode, Comment } from './components';
import { IconButton } from '../../../shared/components';
import I18n from './../../../i18n';
import { styleVars } from './../../../shared/constance/style-variables';
import Plus from './../../../assets/icons/plus.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import { connect } from 'react-redux';
import { SKIP, PLAY, PAUSE } from './../../../redux/modules/player/actions';
import { Song } from './../../../models/song';

interface Props extends DispatchProps, StateProps {
    navigation: any,
}

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

const Player: React.FunctionComponent<Props> = (props: Props) => {

    const [isNowPlaying, setNowPlaying] = useState<boolean>(false);

    useEffect(() => {
        TrackPlayer.addEventListener('playback-track-changed', async (data) => {
            await TrackPlayer.getTrack(data.nextTrack)
            .then((value) => {
                const song: Song = {
                    id: value.id,
                    url: value.url,
                    artist: value.artist,
                    image_url: value.artwork,
                    title: value.title,
                };
                props.saveSongToStore(song);
            })
            .catch((error) => {
                console.log(error);
            });
        });
    });

    let spinValue = new Animated.Value(0);

    let diskAnimation = Animated.loop(
        Animated.timing(
          spinValue,
          {
           toValue: 1,
           duration: 30000,
           easing: Easing.linear,
           useNativeDriver: true,
          }
        )
    );

    const togglePlayPause = () => {
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
    const handleShuffle = () => {

    };
    const handleRepeat = () => {

    };
    const handleBack = () => {
        props.navigation.goBack();
    };
    const handleScrollTab = (event: any) => {
        if (Math.floor(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 1))) {setNowPlaying(true);}
        else {setNowPlaying(false);}
    };

    useEffect(() => {
        diskAnimation.start();
    }, []);

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
    });

    return (
        <>
            <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: props.song.image_url}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={() => handleBack()}/>
                        <Text style={styles.headerTitle}>{props.song.title}</Text>
                        <View style={{width: 20}}/>
                    </View>
                    <View style={styles.dotGroup}>
                        <View style={[styles.dot, isNowPlaying ? {borderColor: 'white'} : {borderColor: styleVars.secondaryColor, backgroundColor: styleVars.secondaryColor}]}/>
                        <View style={[styles.dot, !isNowPlaying ? {borderColor: 'white'} : {borderColor: styleVars.secondaryColor, backgroundColor: styleVars.secondaryColor}]}/>
                    </View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollTab}
                        >
                        <View style={styles.tab}>
                            <View style={styles.body}>
                                <Animated.Image source={{uri: props.song.image_url}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                                <Text style={styles.song}>{props.song.title}</Text>
                                <Text style={styles.artist}>{props.song.artist}</Text>
                            </View>
                        </View>
                        <View style={styles.tab} />
                    </ScrollView>
                    <View style={styles.buttonGroup}>
                        <PlaybackMode mode="shuffle" onClick={() => handleShuffle()}/>
                        <PreviousNextButton type="previous" onClick={() => handlePrevious()}/>
                        <PlayPauseButton isPlaying={props.song.isPlaying} onClick={() => togglePlayPause()}/>
                        <PreviousNextButton type="next" onClick={() => handleNext()}/>
                        <PlaybackMode mode="repeat" onClick={() => handleRepeat()}/>
                    </View>
                    <View style={styles.buttonGroup2}>
                        <IconButton icon={Plus} onClick={() => {}}/>
                        <IconButton icon={Download} onClick={() => {}}/>
                        <IconButton icon={Heart} onClick={() => {}}/>
                        <IconButton icon={List} onClick={() => {}}/>
                    </View>
                    <View style={styles.comment}>
                        <Comment />
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
