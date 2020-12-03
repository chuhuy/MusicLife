/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { Song } from '../../../models/song';
import { continueMusic, pauseMusic, skipMusic } from '../../../redux/modules/player/actions';
import { IconButton } from '../../../shared/components';
import NextIcon from './../../../assets/icons/next-active.svg';
import PauseIcon from './../../../assets/icons/pause-active.svg';
import PlayIcon from './../../../assets/icons/play-active.svg';
import PreviousIcon from './../../../assets/icons/previous-active.svg';
import { styles } from './styles';

interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
        playMusic: () => dispatch(continueMusic()),
        pauseMusic: () => dispatch(pauseMusic()),
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
        player
    } = props;

    const {isPlaying, songs, songIndex} = player;
    const oldSongs = useRef<Array<Song>>([]);
    
    useEffect(() => {
        if (songs.length) {
            let prevLastSong = oldSongs.current.length;
            let newLastSong = songs.length;
            let newSongs = [];
            let isPlayNew = !prevLastSong || prevLastSong === newLastSong;

            if (prevLastSong > newLastSong) {
                for (let i = 0; i < prevLastSong; i++) {
                    let isExist = false;

                    for (let j = 0; j < songs.length; j++) {
                        if (songs[j].music_id === oldSongs.current[i].music_id) {
                            isExist = true;
                        }
                    }

                    if (!isExist){
                        newSongs.push(oldSongs.current[i]);
                    }
                }

                let removeIds = newSongs.map((song) => song.music_id.toString());
                TrackPlayer.remove(removeIds)
                    .catch((err) => {
                        console.log(err);

                        TrackPlayer.pause().then(() => pauseMusic());
                    });
            } else {
                newSongs = !prevLastSong || prevLastSong === newLastSong ? songs : songs.slice(prevLastSong);

                if (newSongs?.length) {
                    for (let i = 0; i < newSongs.length; i++) {
                        let track = {
                            id: newSongs[i].music_id.toString(),
                            url: newSongs[i].url,
                            title: newSongs[i].title,
                            artist: newSongs[i].artists,
                            album: newSongs[i].album || '',
                            genre: newSongs[i].genre || '',
                            date: '2020-10-20T07:00:00+00:00',
                            artwork: newSongs[i].artwork,
                        };

                        console.log(track)

                        TrackPlayer.add(track)
                            .catch(err => {
                                console.log(err);
                            })
                    }
                }
            }
            
            if (isPlayNew) {
                TrackPlayer.play()
                    .catch((e) => {
                        console.log(e);
                        pauseMusic()
                    })
            }

            oldSongs.current = songs;
        } else {
            const resetTrack = async () => {
                let currentTracks = await TrackPlayer.getCurrentTrack();
                
                if (currentTracks) {
                    TrackPlayer.pause()
                        .then(() => {
                            pauseMusic();

                            TrackPlayer.reset()
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                }
            }

            resetTrack();
        }
        
    }, [songs])

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

    const handlePlayPause = () => {
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
    
    const handleOnClick = () => {
        if (songs.length) navigation.navigate('Player');
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
