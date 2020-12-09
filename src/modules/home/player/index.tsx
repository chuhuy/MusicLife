/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { repeat, shuffle } from '../../../redux/modules/player/actions';
import { IconButton, NotFoundItem } from '../../../shared/components';
import { handleNext, handlePrevious, togglePlay } from '../../../shared/helper/player';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import Plus from './../../../assets/icons/plus.svg';
import { CommentBox, PlaybackMode, PlayPauseButton, PreviousNextButton } from './components';
import SeekBar from './components/seek-bar';
import { styles } from './styles';
import NotFoundLyric from '../../../assets/icons/not-found-lyric.svg';
import I18n from '../../../i18n';

interface Props extends DispatchProps, StateProps {
    route: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        repeatMusic: () => dispatch(repeat()),
        shuffleMusic: () => dispatch(shuffle()),
    };
};
const mapStateToProps = (state: any) => ({
    player: state.player,
});

const Tab = {
    playing: 0,
    lyric: 1,
};

const Player: React.FunctionComponent<Props> = (props: Props) => {
    const {
        route,
        shuffleMusic,
        repeatMusic,
        player,
    } = props;

    const {
        songs,
        isPlaying,
        songIndex,
        isRepeat,
        isShuffle,
    } = player;

    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState<number>(Tab.playing);
    const scrollViewRef = useRef(null);
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

    useEffect(() => {
        if (isPlaying) {
            diskAnimation.start();
        } else {
            diskAnimation.stop();
        }
    });

    useEffect(() => {
        if (isPlaying) {
            setSpinValue(new Animated.Value(0));
        }
    }, [songIndex]);

    const toggleTab = (index: number) => {
        if (index !== activeTab) {
            setActiveTab(index);

            scrollViewRef.current.scrollTo({
                x: Dimensions.get('window').width * (index),
                y: 0,
                animated: true,
            });
        }
    };

    const handleScrollTab = (event: any) => {
        let index = Math.floor(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 1));
        setActiveTab(index);
    };
    
    const handleShuffle = () => {
        shuffleMusic();
    };

    const handleRepeat = () => {
        repeatMusic();
    };

    const handleBack = () => {
        navigation.goBack();
    };

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const renderLyric = () => {
        let {lyric} = songs[songIndex];

        if (lyric) {
            let lyricRows = songs[songIndex].lyric.split('{\"\\n\"}');
            let rows = lyricRows.map((lyric, index) => {
                return (
                    <Text
                        key={index}
                        style={styles.lyricRow}>
                        {lyric}
                    </Text>
                );
            });

            return (
                <ScrollView
                    style={styles.lyricContainer}
                    showsVerticalScrollIndicator={false}>
                    {rows}
                </ScrollView>
            );
        } else {
            return (
                <NotFoundItem
                    icon={<NotFoundLyric />}
                    text={I18n.translate('player.not-found-lyric')}
                />
            );
        }
    };

    return (
        <>
            <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: songs[songIndex].image_url}}>
                <View style={styles.layer}/>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowDown} onClick={handleBack}/>
                        <Text
                            style={styles.headerTitle}
                            numberOfLines={1}>
                            {songs[songIndex].title}
                        </Text>
                    </View>

                    <View style={styles.dotGroup}>
                        <Pressable
                            style={{padding: 5}}
                            onPress={() => toggleTab(Tab.playing)}
                        >
                            <View style={[styles.dot, activeTab === Tab.playing ? styles.dotActive : styles.dotDefault]} />
                        </Pressable>

                        <Pressable
                            style={{padding: 5}}
                            onPress={() => toggleTab(Tab.lyric)}
                        >
                            <View style={[styles.dot, activeTab === Tab.lyric ? styles.dotActive : styles.dotDefault]} />
                        </Pressable>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
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
                        <View style={styles.tab}>
                            {renderLyric()}
                        </View>
                    </ScrollView>

                    <SeekBar currentTime={route.params?.currentTime} />

                    <View style={styles.control}>
                        <View style={styles.buttonGroup}>
                            <PlaybackMode mode="shuffle" isActive={isShuffle} onClick={handleShuffle}/>
                            <PreviousNextButton type="previous" onClick={handlePrevious}/>
                            <PlayPauseButton isPlaying={isPlaying} onClick={togglePlay}/>
                            <PreviousNextButton type="next" onClick={handleNext}/>
                            <PlaybackMode mode="repeat" isActive={isRepeat} onClick={handleRepeat}/>
                        </View>

                        <View style={styles.buttonGroup2}>
                            <IconButton icon={Plus} onClick={() => {}}/>
                            <IconButton icon={Download} onClick={() => {}}/>
                            <IconButton icon={Heart} onClick={() => {}}/>
                            <IconButton icon={List} onClick={() => {}}/>
                        </View>
                    </View>

                    <View style={styles.comment}>
                        <CommentBox music_id={songs[songIndex].music_id}/>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
