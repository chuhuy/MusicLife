/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import TrackPlayer, { pause } from 'react-native-track-player';
import { connect } from 'react-redux';
import { Song } from '../../../models/song';
import { continueMusic, counter, pauseMusic, repeat, restart, skipMusic } from '../../../redux/modules/player/actions';
import { IconButton } from '../../../shared/components';
import NextIcon from './../../../assets/icons/next-active.svg';
import PauseIcon from './../../../assets/icons/pause-active.svg';
import PlayIcon from './../../../assets/icons/play-active.svg';
import PreviousIcon from './../../../assets/icons/previous-active.svg';
import { styles } from './styles';
import { useTrackPlayerProgress, usePlaybackState } from 'react-native-track-player/lib/hooks';
import { getNotExistSongs } from '../../../shared/helper/player';
import { postSongCounter } from '../../../api/explore';

interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean, isEnd: boolean) => dispatch(skipMusic(isNext, isEnd)),
        playMusic: () => dispatch(continueMusic()),
        pauseMusic: () => dispatch(pauseMusic()),
        counter: (music_id: number) => dispatch(counter(music_id)),
        repeat: () => dispatch(repeat()),
        restart: () => dispatch(restart())
    };
};
const mapStateToProps = (state: any) => ({
    player: state.player,
});

const Controller: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    
    const {
        skipMusic, 
        playMusic, 
        pauseMusic, 
        restart,
        player
    } = props;

    const {isPlaying, songs, songIndex, isRepeat} = player;
    const {position, duration} = useTrackPlayerProgress(500);

    useEffect(() => {
        TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
            console.log('end queue');
            console.log(data);
            let {position, track} = data;

            if (position > 0) {
                postSongCounter(parseInt(track))
                    .then((data) => {
                        console.log(data);
                        console.log('post end counter')
                    });

                if (isRepeat) {
                    console.log('restart song');
                    const currentTracks = await TrackPlayer.getQueue();
        
                    TrackPlayer.reset()
                        .then(() => {
                            TrackPlayer.add(currentTracks)
                                .then(() => {
                                    restart();
                                    TrackPlayer.play()
                                })
                        })
                        .catch(err => {
                            console.log(err);
                            TrackPlayer.stop()
                            pauseMusic()
                        })
                } else {
                    pauseMusic();
                }
            }
        })

        TrackPlayer.addEventListener('playback-track-changed', async (data) => {
            let {nextTrack, track, position} = data;  
            console.log('playback track')
            console.log(data)

            if (track && position >= 0) {
                if (nextTrack) {
                    TrackPlayer.pause();

                    postSongCounter(parseInt(track))
                        .then((data) => {
                            console.log(data);
                            console.log('play next song');
                            skipMusic(true, false);
                            TrackPlayer.play()
                        })
                        .catch(() => {
                            console.log('post failed');
                        })
                } 
            }
        })
    }, []);

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

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    };

    const handleNext = async () => {
        TrackPlayer.skipToNext()
            .then(() => {
                skipMusic(true, false);

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
    
    const handleOnClick = async () => {
        if (songs.length) {
            navigation.navigate('Player', {
                currentTime: position && duration ? position/duration : 0
            });
        }
    };

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

    return songs.length ? (
        <Pressable
            style={styles.view}
            onPress={handleOnClick}
        >
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.image} source={{uri: songs[songIndex].image_url}}/>
                    
                    <View style={styles.titleGroup}>
                        <Text style={styles.song}>{songs[songIndex].title}</Text>
                        <Text style={styles.artist}>{songs[songIndex].artists}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.button}>
                        <IconButton icon={PreviousIcon} onClick={handlePrevious}/>
                    </View>

                    <View style={styles.button}>
                        <IconButton icon={isPlaying ? PauseIcon : PlayIcon} onClick={handlePlayPause}/>
                    </View>

                    <View style={styles.button}>
                        <IconButton icon={NextIcon} onClick={handleNext}/>
                    </View>
                </View>
            </View>
        </Pressable>
    ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
