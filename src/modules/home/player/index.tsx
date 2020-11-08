/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { SKIP } from './../../../redux/modules/player/actions';
import { Song } from './../../../models/song';

interface Props extends DispatchProps, StateProps {
    navigation: any,
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveSongToStore: (song: Song) => dispatch({type: SKIP, payload: song}),
    };
};
const mapStateToProps = (state: any) => ({
    song: state.player,
});

const Player: React.FunctionComponent<Props> = (props: Props) => {

    const [isPlaying, setPlaying] = useState<boolean>(true);
    const [isNowPlaying, setNowPlaying] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<Song>(props.song);

    useEffect(() => {
        TrackPlayer.addEventListener('playback-track-changed', async (data) => {
            const track = await TrackPlayer.getTrack(data.nextTrack);
            const song: Song = {
                id: track.id,
                url: track.url,
                artist: track.artist,
                image_url: track.artwork,
                title: track.title,
            };
            setCurrentSong(song);
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
        if (isPlaying) {
            TrackPlayer.pause();
            spinValue.stopAnimation();
        }
        else {
            TrackPlayer.play();
            spinValue.setValue(0);
        }
        setPlaying(!isPlaying);
    };
    const handlePrevious = () => {
        TrackPlayer.skipToPrevious()
        .then(() => {
            TrackPlayer.play();
        })
        .catch((e) => {
            console.log(e);
            TrackPlayer.seekTo(0);
            TrackPlayer.play();
        });
    };
    const handleNext = () => {
        TrackPlayer.skipToNext()
        .then(() => {
            TrackPlayer.play();
        })
        .catch((e) => {
            console.log(e);
            TrackPlayer.pause();
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

    const track = {
        id: '1',
        url: 'https://f9-stream.nixcdn.com/NhacCuaTui1005/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3?st=cb28yaeTP3YF8rW-P4ZfTw&e=1604910600&t=1604824200459',
        title: 'Trên tình bạn dưới tình yêu',
        artist: 'Min',
        album: 'Test album',
        genre: 'pop',
        date: '2020-10-20T07:00:00+00:00',
        artwork: 'https://cuoifly.tuoitre.vn/820/0/ttc/r/2020/11/05/toa23-1604590587.jpg',
    };
    const track2 = {
        id: '2',
        url: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1003/AnhDauDay-ReddyHuuDuy-6581875.mp3?st=fpIb8G59gEgCqZAqVWQljA&e=1602594009&t=1602507609328',
        title: 'Anh đâu đấy',
        artist: 'Huy Chu',
        album: 'Test album',
        genre: 'pop',
        date: '2020-10-20T07:00:00+00:00',
        artwork: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    };
    const track3 = {
        id: '3',
        url: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1003/AnhDauDay-ReddyHuuDuy-6581875.mp3?st=fpIb8G59gEgCqZAqVWQljA&e=1602594009&t=1602507609328',
        title: 'Anh đâu đấy',
        artist: 'Huy Chu',
        album: 'Test album',
        genre: 'pop',
        date: '2020-10-20T07:00:00+00:00',
        artwork: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    };

    useEffect(() => {
        TrackPlayer.add([track, track2, track3]).then(() => {
            TrackPlayer.play();
        });

    }, []);

    return (
        <>
            <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: currentSong.image_url}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={() => handleBack()}/>
                        <Text style={styles.headerTitle}>{currentSong.title}</Text>
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
                                <Animated.Image source={{uri: currentSong.image_url}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                                <Text style={styles.song}>{currentSong.title}</Text>
                                <Text style={styles.artist}>{currentSong.artist}</Text>
                            </View>
                        </View>
                        <View style={styles.tab} />
                    </ScrollView>
                    <View style={styles.buttonGroup}>
                        <PlaybackMode mode="shuffle" onClick={() => handleShuffle()}/>
                        <PreviousNextButton type="previous" onClick={() => handlePrevious()}/>
                        <PlayPauseButton isPlaying={isPlaying} onClick={() => togglePlayPause()}/>
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
