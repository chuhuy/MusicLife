/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { continueMusic, pauseMusic, repeat, shuffle, skipMusic } from '../../../redux/modules/player/actions';
import { IconButton } from '../../../shared/components';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import Plus from './../../../assets/icons/plus.svg';
import { Comment, PlaybackMode, PlayPauseButton, PreviousNextButton } from './components';
import SeekBar from './components/seek-bar';
import { styles } from './styles';

interface Props extends DispatchProps, StateProps {
    navigation: any,
    route: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean, isEnd: boolean) => dispatch(skipMusic(isNext, isEnd)),
        playMusic: () => dispatch(continueMusic()),
        pauseMusic: () => dispatch(pauseMusic()),
        repeatMusic: () => dispatch(repeat()),
        shuffleMusic: () => dispatch(shuffle()),
    };
};
const mapStateToProps = (state: any) => ({
    player: state.player,
});

const Tab = {
    playing: 'playing',
    playlist: 'playlist'
}

const Player: React.FunctionComponent<Props> = (props: Props) => {
    const {
        navigation,
        route,
        playMusic,
        pauseMusic,
        shuffleMusic,
        repeatMusic,
        skipMusic,
        player,
    } = props;

    const {
        songs, 
        isPlaying, 
        songIndex, 
        isRepeat, 
        isShuffle
    } = player;

    const [tab, setTab] = useState<string>(Tab.playing);
    let [spinValue, setSpinValue] = useState(new Animated.Value(0));
    let diskAnimation = Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 25000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        )
    );

    diskAnimation.start();

    useEffect(() => {
        if (isPlaying) {
            diskAnimation.start();
        } else {
            diskAnimation.stop();
        }
    }, [isPlaying])

    useEffect(() => {
        if (isPlaying) {
            setSpinValue(new Animated.Value(0));
        }
    }, [songIndex])

    const toggleTab = (requestTab: string) => {
        if (requestTab !== tab) {
            setTab(requestTab)
        }
    }

    const togglePlayPause = async () => {
        if (isPlaying) {
            TrackPlayer.pause()
                .then(() => {pauseMusic()})
                .catch((error) => console.log(error));
        } else {
            const trackState = await TrackPlayer.getState();

            if (trackState === TrackPlayer.STATE_STOPPED) {
                TrackPlayer.seekTo(0);
            }

            TrackPlayer.play()
                .then(() => {playMusic()})
                .catch((error) => console.log(error));
        }
    };

    const handlePrevious = () => {
        TrackPlayer.skipToPrevious()
            .then(() => {
                skipMusic(false, false);

                TrackPlayer.play()
                    .then(() => {
                        if (!isPlaying) {
                            playMusic()
                        }
                    })
                    .catch((error) => console.log(error));
            })
            .catch((e) => {
                console.log(e);
                handleRestart().then(() => {
                    skipMusic(false, false);
                })
            });
    };

    const handleNext = async () => {
        TrackPlayer.skipToNext()
            .then(() => {
                skipMusic(true, false);
                console.log('player')
                
                TrackPlayer.play()
                    .then(() => {
                        if (!isPlaying) {
                            playMusic();
                        }
                    })
                    .catch((error) => console.log(error));
            })
            .catch((e) => {
                console.log(e);
                handleRestart().then(() => {
                    skipMusic(true, false);
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
                        console.log('reset');
                        TrackPlayer.play();
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
            <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: songs[songIndex].image_url}}>
                <View style={styles.layer}/>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={handleBack}/>
                        <Text style={styles.headerTitle}>{songs[songIndex].title}</Text>
                        <View style={{width: 20}}/>
                    </View>

                    <View style={styles.dotGroup}>
                        <Pressable 
                            style={{padding: 5}}
                            onPress={() => toggleTab(Tab.playing)}
                        >
                            <View style={[styles.dot, tab === Tab.playing ? styles.dotActive : styles.dotDefault]} />
                        </Pressable>

                        <Pressable 
                            style={{padding: 5}}
                            onPress={() => toggleTab(Tab.playlist)}
                        >
                            <View style={[styles.dot, tab === Tab.playlist ? styles.dotActive : styles.dotDefault]} />
                        </Pressable>
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

                    <SeekBar currentTime={route.params?.currentTime} />

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
