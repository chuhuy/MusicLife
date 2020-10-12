/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { styles } from './styles';
import TrackPlayer from 'react-native-track-player';
import { PlayPauseButton, PreviousNextButton, PlaybackMode } from './components';
import { LinkButton } from '../../../shared/components';
import I18n from './../../../i18n';

interface Props {}

const Player: React.FunctionComponent<Props> = (props: Props) => {
    const [isPlaying, setPlaying] = useState<boolean>(true);

    const togglePlayPause = () => {
        if (isPlaying) {
            TrackPlayer.pause();
        }
        else {
            TrackPlayer.play();
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
                        <LinkButton title="Back" onClick={() => {}} color="white"/>
                        <Text style={styles.headerTitle}>Anh đâu đấy</Text>
                        <LinkButton title="Back" onClick={() => {}} color="transparent"/>
                    </View>
                    <View style={styles.body}>
                        <Image source={{uri: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg'}} style={styles.disk}/>
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
                        <LinkButton title="Add" onClick={() => {}} color="white"/>
                        <LinkButton title="Download" onClick={() => {}} color="white"/>
                        <LinkButton title="Like" onClick={() => {}} color="white"/>
                        <LinkButton title="Playlist" onClick={() => {}} color="white"/>
                    </View>
                    <View style={styles.commentHeader}>
                        <Text style={styles.commentText}>{I18n.translate('player.comment')}</Text>
                        <LinkButton title="Open" onClick={() => {}} color="white"/>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

export default Player;
