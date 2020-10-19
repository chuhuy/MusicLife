/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, Animated } from 'react-native';
import { styles } from './styles';
import TrackPlayer from 'react-native-track-player';
import { PlayPauseButton, PreviousNextButton, PlaybackMode, Comment } from './components';
import { LinkButton, IconButton } from '../../../shared/components';
import I18n from './../../../i18n';
import Plus from './../../../assets/icons/plus.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import ArrowUp from './../../../assets/icons/arrow-up.svg';
import { Easing } from 'react-native';

interface Props {
    navigation: any
}

const Player: React.FunctionComponent<Props> = (props: Props) => {
    const [isPlaying, setPlaying] = useState<boolean>(true);
    const [isCommentShown, setCommentShown] = useState<boolean>(false);

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

    const toggleShowComment = () => {
        setCommentShown(!isCommentShown);
    };

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
        TrackPlayer.skipToPrevious();
    };
    const handleNext = () => {
        TrackPlayer.skipToNext();
    };
    const handleShuffle = () => {

    };
    const handleRepeat = () => {

    };
    const handleBack = () => {
        props.navigation.goBack();
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
        url: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1003/AnhDauDay-ReddyHuuDuy-6581875.mp3?st=fpIb8G59gEgCqZAqVWQljA&e=1602594009&t=1602507609328',
        title: 'Anh đâu đấy',
        artist: 'Huy Chu',
        album: 'Test album',
        genre: 'pop',
        date: '2020-10-20T07:00:00+00:00',
        artwork: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
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
            <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg'}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={() => handleBack()}/>
                        <Text style={styles.headerTitle}>Anh đâu đấy</Text>
                        <View style={{width: 20}}/>
                    </View>
                    <View style={styles.body}>
                        <Animated.Image source={{uri: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg'}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                        <Text style={styles.song}>Anh đâu đấy</Text>
                        <Text style={styles.artist}>Huy Chu</Text>
                    </View>
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
                    <Comment />
                </View>
            </ImageBackground>
        </>
    );
};

export default Player;
