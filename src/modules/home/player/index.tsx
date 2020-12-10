/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {repeat, shuffle} from '../../../redux/modules/player/actions';
import {IconButton, NotFoundItem} from '../../../shared/components';
import {
  handleNext,
  handlePrevious,
  togglePlay,
} from '../../../shared/helper/player';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import Download from './../../../assets/icons/download.svg';
import Heart from './../../../assets/icons/heart.svg';
import HeartActive from './../../../assets/icons/heart-active.svg';
import List from './../../../assets/icons/list.svg';
import Plus from './../../../assets/icons/plus.svg';
import {
  CommentBox,
  PlaybackMode,
  PlayPauseButton,
  PreviousNextButton,
} from './components';
import SeekBar from './components/seek-bar';
import {styles} from './styles';
import NotFoundLyric from '../../../assets/icons/not-found-lyric.svg';
import I18n from '../../../i18n';
import TrackPlayer from 'react-native-track-player';
import NowPlaying from './components/now-playing';
import {
  downloadSong,
} from './../../../services/file-system';
import {PermissionsAndroid} from 'react-native';

interface Props extends DispatchProps, StateProps {
  route: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    repeatMusic: () => dispatch(repeat()),
    shuffleMusic: () => dispatch(shuffle()),
  };
};
const mapStateToProps = (state: any) => ({
  player: state.player,
  access_token: state.auth.access_token,
});

const Tab = {
  playlist: 0,
  playing: 1,
  lyric: 2,
};

const Player: React.FunctionComponent<Props> = (props: Props) => {
  const {route, shuffleMusic, repeatMusic, player, access_token} = props;

  const {songs, isPlaying, songIndex, isRepeat, isShuffle} = player;

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState<number>(-1);
  const scrollViewRef = useRef(null);

  let spinAnim = useRef(new Animated.Value(0));
  let diskAnimation = useRef(Animated.loop(
    Animated.timing(
      spinAnim.current,
      {
        toValue: 1,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )
  ));
  // Second interpolate beginning and end values (in this case 0 and 1)
  let spin = spinAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (isPlaying) {
      diskAnimation.current.start();
    } else {
      diskAnimation.current.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (scrollViewRef.current) {
      toggleTab(Tab.playing);
    }
  }, [scrollViewRef.current]);

  const toggleTab = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
      console.log(Dimensions.get('window').width * (index));
      scrollViewRef.current.scrollTo({
        x: Dimensions.get('window').width * index,
        y: 0,
        animated: true,
      });
    }
  };

  const handleScrollTab = (event: any) => {
    let index = Math.floor(
      event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 1),
    );
    setActiveTab(index);
  };

  const handleShuffle = () => {
    shuffleMusic();

    if (songs.length > 1) {
      try {
        TrackPlayer.reset().then(() => {
          let tracks = songs.map((song) => {
            return {
              id: song.music_id.toString(),
              url: song.url,
              title: song.title,
              artist: song.artists,
              album: song.album || '',
              genre: song.genre || '',
              date: '2020-10-20T07:00:00+00:00',
              artwork: song.image_url,
            };
          });

          TrackPlayer.add(tracks).then(() => {
            if (isPlaying) {
              TrackPlayer.play();
            }
          });
        });
      } catch (err) {
        console.log(err);
        TrackPlayer.pause();
      }
    }
  };

  const handleRepeat = () => {
    repeatMusic();
    console.log('repeat');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLove = () => {};

  const renderLyric = () => {
    let song = songs[songIndex];

    if (song && song.lyric) {
      let lyricRows = song.lyric.split('{\"\\n\"}');
      let rows = lyricRows.map((text, index) => {
        return (
          <Text
            key={index}
            style={styles.lyricRow}>
            {text}
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

  const handleDownload = async (url: string, title: string, artists: string, image_url: string) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music Life',
          message: I18n.translate('player.ask-for-permission'),
          buttonNeutral: I18n.translate('player.ask-me-later'),
          buttonNegative: I18n.translate('player.cancel'),
          buttonPositive: I18n.translate('player.agree'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await downloadSong(title, url, artists, image_url);
      } else {
        Alert.alert(I18n.translate('player.do-not-have-permission'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ImageBackground style={styles.imageBackground} blurRadius={3} source={{uri: songs[songIndex]?.image_url}}>
          <View style={styles.layer}/>

          <View style={styles.container}>
            <View style={styles.header}>
              <IconButton icon={ArrowDown} onClick={handleBack}/>
              <Text
                style={styles.headerTitle}
                numberOfLines={1}>
                {activeTab === Tab.playlist ? I18n.translate('player.nowPlaying') : songs[songIndex]?.title}
              </Text>
            </View>

            <View style={styles.dotGroup}>
              <Pressable
                style={{padding: 5}}
                onPress={() => toggleTab(Tab.playlist)}
              >
                <View style={[styles.dot, activeTab === Tab.playlist ? styles.dotActive : styles.dotDefault]} />
              </Pressable>

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
                <NowPlaying />
              </View>

              <View style={styles.tab}>
                <View style={styles.body}>
                  <Animated.Image source={{uri: songs[songIndex]?.image_url}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                  <Text style={styles.song}>{songs[songIndex]?.title}</Text>
                  <Text style={styles.artist}>{songs[songIndex]?.artists}</Text>
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
                {access_token ? <IconButton icon={Plus} onClick={() => {}}/> : null}

                <IconButton icon={Download} onClick={() =>
                  handleDownload(songs[songIndex].url, songs[songIndex].title, songs[songIndex].artists, songs[songIndex].image_url)
                }/>

                {access_token ? (
                  <IconButton
                    icon={songs[songIndex]?.isLove ? HeartActive : Heart}
                    onClick={handleLove}/>
                ) : null}

                <IconButton icon={List} onClick={() => toggleTab(Tab.playlist)}/>
              </View>
            </View>

            <CommentBox music_id={songs[songIndex]?.music_id}/>
          </View>
        </ImageBackground>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
