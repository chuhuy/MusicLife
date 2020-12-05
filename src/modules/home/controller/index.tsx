/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import { connect } from 'react-redux';
import { continueMusic, counter, pauseMusic, repeat, restart, skipMusic } from '../../../redux/modules/player/actions';
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

    const handlePrevious = () => {
        TrackPlayer.skipToPrevious()
            .then(() => {
                skipMusic(false);
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
            pauseMusic();
        } else {
            playMusic();
        }
    };

    const handleNext = async () => {
        TrackPlayer.skipToNext()
            .then(() => {
                skipMusic(true);
            })
            .catch((e) => {
                console.log(e);
                handleRestart().then(() => {
                    skipMusic(true);
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
