/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, ImageBackground, ScrollView, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect, useDispatch } from 'react-redux';
import { IconButton } from '../../../shared/components';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import Plus from './../../../assets/icons/plus.svg';
import { Song } from './../../../models/song';
import { continueMusic, pauseMusic, repeat, SHUFFLE, shuffle, skipMusic } from './../../../redux/modules/player/actions';
import { styleVars } from './../../../shared/constance/style-variables';
import { Comment, PlaybackMode, PlayPauseButton, PreviousNextButton } from './components';
import { styles } from './styles';

interface Props extends DispatchProps, StateProps {
    navigation: any,
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
        playMusic: () => dispatch(continueMusic()),
        pauseMusic: () => dispatch(pauseMusic()),
        repeatMusic: () => dispatch(repeat()),
        shuffleMusic: () => dispatch(shuffle())
    };
};
const mapStateToProps = (state: any) => ({
    player: state.player,
});

const Player: React.FunctionComponent<Props> = (props: Props) => {
    const {
        navigation,
        playMusic,
        pauseMusic,
        shuffleMusic,
        repeatMusic,
        player
    } = props;

    const {
        songs, 
        isPlaying, 
        songIndex, 
        isRepeat, 
        isShuffle
    } = player;

    let [spinValue, setSpinValue] = useState(new Animated.Value(0));
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

    useEffect(() => {
        if (isPlaying) {
            diskAnimation = Animated.loop(
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

            diskAnimation.start();

            TrackPlayer.addEventListener('playback-track-changed', async (data) => {
                await TrackPlayer.getTrack(data.nextTrack)
                    .then((value) => {
                        const song: Song = {
                            music_id: parseInt(value.id),
                            url: value.url,
                            artists: value.artist,
                            image_url: value.artwork,
                            title: value.title,
                        };
                        skipMusic(true)
                    })
                    .catch((error) => {
                        if (diskAnimation) {
                            diskAnimation.stop();
                        }
                    });
            });
        } else diskAnimation.stop();
    }, [isPlaying]);

    const togglePlayPause = () => {
        if (isPlaying) {
            TrackPlayer.pause()
                .then(() => {pauseMusic()})
                .catch((error) => console.log(error));
        } else {
            TrackPlayer.play()
                .then(() => {playMusic()})
                .catch((error) => console.log(error));
        }
    };

    const handlePrevious = () => {
        TrackPlayer.skipToPrevious()
            .then(() => {
                skipMusic(false);

                TrackPlayer.play()
                    .then(() => {playMusic()})
                    .catch((error) => console.log(error));
            })
            .catch((e) => {
                console.log(e);
                handleRestart().then(() => {
                    skipMusic(false);
                })
            });
    };

    const handleNext = () => {
        TrackPlayer.skipToNext()
            .then(() => {
                skipMusic(true);
                
                TrackPlayer.play()
                    .then(() => {playMusic()})
                    .catch((error) => console.log(error));
            })
            .catch((e) => {
                console.log(e);
                handleRestart().then(() => {
                    skipMusic(true);
                })
            });
    };
    
    const handleShuffle = () => {
        shuffleMusic();
    };

    const handleRepeat = () => {
        repeatMusic();
    }

    const handleRestart = async () => {
        const currentTracks = await TrackPlayer.getQueue();
        TrackPlayer.reset()
            .then(() => {
                TrackPlayer.add(currentTracks)
                    .then(() => {
                        TrackPlayer.play()
                    })
                    .catch(err => {
                        console.log(err);
                        pauseMusic();
                    })
            })
            .catch(err => {
                console.log(err);
                pauseMusic();
            })
    }

    const handleBack = () => {
        navigation.goBack();
    };
    const handleScrollTab = (event: any) => {
        if (Math.floor(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 1))) {playMusic()}
        else {pauseMusic()}
    };

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <>
            <ImageBackground style={styles.imageBackground} blurRadius={5} source={{uri: songs[songIndex].image_url}}>
                <View style={styles.layer}/>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={handleBack}/>
                        <Text style={styles.headerTitle}>{songs[songIndex].title}</Text>
                        <View style={{width: 20}}/>
                    </View>
                    <View style={styles.dotGroup}>
                        <View style={[styles.dot, isPlaying ? {borderColor: 'white'} : {borderColor: styleVars.secondaryColor, backgroundColor: styleVars.secondaryColor}]}/>
                        <View style={[styles.dot, !isPlaying ? {borderColor: 'white'} : {borderColor: styleVars.secondaryColor, backgroundColor: styleVars.secondaryColor}]}/>
                    </View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollTab}
                    >
                        <View style={styles.tab}>
                            <View style={styles.body}>
                                <Animated.Image source={{uri: songs[songIndex].image_url}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                                <Text style={styles.song}>{songs[songIndex].title}</Text>
                                <Text style={styles.artist}>{songs[songIndex].artists}</Text>
                            </View>
                        </View>
                        <View style={styles.tab} />
                    </ScrollView>
                    <View style={styles.buttonGroup}>
                        <PlaybackMode mode="shuffle" isActive={isShuffle} onClick={handleShuffle}/>
                        <PreviousNextButton type="previous" onClick={handlePrevious}/>
                        <PlayPauseButton isPlaying={isPlaying} onClick={togglePlayPause}/>
                        <PreviousNextButton type="next" onClick={handleNext}/>
                        <PlaybackMode mode="repeat" isActive={isRepeat} onClick={handleRepeat}/>
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
