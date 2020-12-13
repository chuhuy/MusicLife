/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { addSongToPlaylist, fetchPersonalPlaylist, postFavoriteSong } from '../../../api/personal';
import NotFoundLyric from '../../../assets/icons/not-found-lyric.svg';
import I18n from '../../../i18n';
import { Playlist } from '../../../models/playlist';
import { repeat, shuffle } from '../../../redux/modules/player/actions';
import { IconButton, NotFoundItem, PlaylistList } from '../../../shared/components';
import ModalBottom from '../../../shared/components/modal-bottom';
import { notify } from '../../../shared/components/notify';
import {
  handleDownload,
  handleNext,
  handlePrevious,
  togglePlay
} from '../../../shared/helper/player';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import Download from './../../../assets/icons/download.svg';
import HeartActive from './../../../assets/icons/heart-active.svg';
import Heart from './../../../assets/icons/heart.svg';
import List from './../../../assets/icons/list.svg';
import Plus from './../../../assets/icons/plus.svg';
import {
  CommentBox,
  PlaybackMode,
  PlayPauseButton,
  PreviousNextButton,
} from './components';
import NowPlaying from './components/now-playing';
import SeekBar from './components/seek-bar';
import { styles } from './styles';
import NotFoundPlaylist from '../../../assets/icons/not-found-playlist.svg';

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
  network: state.network,
});

const Tab = {
  playing: 0,
  playlist: 1,
  lyric: 2,
};

const Player: React.FunctionComponent<Props> = (props: Props) => {
  const {route, shuffleMusic, repeatMusic, player, access_token, network} = props;

  const {songs, isPlaying, songIndex, isRepeat, isShuffle} = player;

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState<number>(Tab.playing);
  const scrollViewRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Array<Playlist>>(null);

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
    if (showModal && !playlists) {
      fetchPersonalPlaylist(access_token)
        .then((data) => {
          setPlaylists(data.personalPlaylist);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal]);

  const toggleTab = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);

      scrollViewRef.current.scrollTo({
        x: Dimensions.get('window').width * index,
        y: 0,
        animated: true,
      });
    }
  };

  const togglePlaylistModal = () => {
    setShowModal(!showModal);
  };

  const addSong = (playlist_id: number) => {
    addSongToPlaylist(access_token, songs[songIndex].music_id, playlist_id)
      .then(() => {
        notify(I18n.translate('common.add-song-playlist'));
        togglePlaylistModal();
      })
      .catch((err) => {
        console.log(err);
        notify(I18n.translate('common.add-song-playlist-fail'));
        togglePlaylistModal();
      });
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

  const handleAddToFavorite = () => {
    if (!isFavorite) {
      postFavoriteSong(access_token, songs[songIndex].music_id)
        .then(() => {
          notify(I18n.translate('common.add-favorite-success'), {position: Toast.positions.CENTER});
          setIsFavorite(true);
        })
        .catch(err => {
          console.log(err);
          notify(I18n.translate('common.add-favorite-fail'), {position: Toast.positions.CENTER});
        });
    }
  };

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
          theme="light"
        />
      );
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
                onPress={() => toggleTab(Tab.playing)}
              >
                <View style={[styles.dot, activeTab === Tab.playing ? styles.dotActive : styles.dotDefault]} />
              </Pressable>

              <Pressable
                style={{padding: 5}}
                onPress={() => toggleTab(Tab.playlist)}
              >
                <View style={[styles.dot, activeTab === Tab.playlist ? styles.dotActive : styles.dotDefault]} />
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
                  <Animated.Image source={{uri: songs[songIndex]?.image_url}} style={[styles.disk, {transform: [{rotate: spin}]}]}/>
                  <Text style={styles.song}>{songs[songIndex]?.title}</Text>
                  <Text style={styles.artist}>{songs[songIndex]?.artists}</Text>
                </View>
              </View>

              <View style={styles.tab}>
                <NowPlaying />
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
                {access_token ? <IconButton icon={Plus} onClick={togglePlaylistModal}/> : null}

                {network ? (
                  <IconButton icon={Download} onClick={() =>
                    handleDownload(songs[songIndex].url, songs[songIndex].title, songs[songIndex].artists, songs[songIndex].image_url)
                  }/>
                ) : null}

                {access_token && network ? (
                  <IconButton
                    icon={isFavorite ? HeartActive : Heart}
                    onClick={handleAddToFavorite}/>
                ) : null}

                <IconButton icon={List} onClick={() => toggleTab(Tab.playlist)}/>
              </View>
            </View>

            <CommentBox music_id={songs[songIndex]?.music_id}/>
          </View>
          <ModalBottom
            isVisible={showModal}
            onHide={togglePlaylistModal}
            item={{
              header: I18n.translate('optionModal.add-to-playlist'),
            }}
          >
            {playlists ? (
              <>
                {playlists.length ? <PlaylistList playlist={playlists} onClick={addSong}/> : (
                  <NotFoundItem
                    icon={<NotFoundPlaylist />}
                    text={I18n.translate('personal.playlist-not-found')}
                  />
                )}
              </>
            ) : null}
          </ModalBottom>
        </ImageBackground>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
