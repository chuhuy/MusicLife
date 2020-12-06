/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import {fetchGenres, getLatestSongs} from '../../../api/explore';
import {chartDummyData} from '../../../data/chart';
import {Genre} from '../../../models/genre';
import {Playlist} from '../../../models/playlist';
import {Song} from '../../../models/song';
import {
  BaseScreen,
  LoadingLayer,
  SectionTitle,
} from '../../../shared/components';
import {PlaylistList} from '../../../shared/components/flatlist';
import HeaderMainPage from '../../../shared/components/header-main-page';
import {Screen} from '../../../shared/constance/screen';
import {playSong} from '../../../shared/helper/player';
import {album, genre} from './../../../data';
import I18n from './../../../i18n';
import {
  pauseMusic,
  playMusic,
  skipMusic,
} from './../../../redux/modules/player/actions';
import {SongItem} from './components';
import GenreSection from './components/genreSection';
import {styles} from './styles';
import {
  ENABLE_LOADING,
  DISABLE_LOADING,
} from './../../../redux/modules/loading/actions';

interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
  return {
    skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
    playMusic: (song: Song) => dispatch(playMusic([song])),
    pauseMusic: () => dispatch(pauseMusic()),
    enableLoading: () => dispatch({type: ENABLE_LOADING}),
    disableLoading: () => dispatch({type: DISABLE_LOADING}),
  };
};
const mapStateToProps = (state: any) => ({
  refresh_token: state.auth.refresh_token,
});

const Explore: React.FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation();
  const {playMusic} = props;

  const [isTop100, setIsTop100] = useState<boolean>(false);
  const [latestSong, setLatestSong] = useState<Array<Song>>(null);
  const [top100, setTop100] = useState<Array<Playlist>>(null);
  const [latestAlbum, setLatestAlbum] = useState<Array<Playlist>>(null);
  const [genreList, setGenreList] = useState<Array<Genre>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    props.enableLoading();
    getLatestSongs()
      .then((data) => {
        console.log(data);
        let top100List = data.top100.map((playlist) => {
          return {
            ...playlist,
            title: `Top 100 ${playlist.title}`,
          };
        });
        setTop100(top100List);

        setLatestSong(data.latestSongs);
        setLatestAlbum(data.latestAlbums);

        fetchGenres(4, 0)
          .then((data) => {
            setGenreList(data.genres);
          })
          .catch((err) => {
            console.log(err);
          });

        props.disableLoading();
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePlayMusic = (song: Song) => {
    console.log('play music');
    try {
      playSong([song]);
      playMusic(song);
      navigation.navigate(Screen.Common.Player);
    } catch (err) {
      console.log(err);
      TrackPlayer.pause().then(() => pauseMusic());
    }
  };

  const handleLatestSong = () => {
    navigation.navigate(Screen.Common.Song, {
      songs: latestSong,
      isLatest: true,
    });
  };

  const handleLatestAlbum = () => {
    navigation.navigate(Screen.Common.Playlist, {
      isAlbum: true,
      isLatest: true,
      playlist: album,
    });
  };

  const handleGenreList = () => {
    navigation.navigate(Screen.Explore.GenreList, {genre});
  };

  const renderLatestSong = () => {
    return latestSong.map((item) => {
      return (
        <SongItem
          key={item.music_id}
          name={item.title}
          artist={item.artists}
          image={item.image_url}
          onClick={() => handlePlayMusic(item)}
        />
      );
    });
  };

  return (
    <>
      <BaseScreen isScroll={false}>
        <HeaderMainPage />

        <ScrollView style={styles.contentContainer}>
          {isLoading ? (
            <>
              <LoadingLayer />
            </>
          ) : (
            <>
              <View style={styles.group}>
                <View style={styles.chart}>
                  <Pressable
                    onPress={() => {
                      setIsTop100(false);
                    }}>
                    <View style={styles.touchArea}>
                      <Text
                        style={
                          isTop100
                            ? styles.chartTitleInactive
                            : styles.chartTitleActive
                        }>
                        {I18n.translate('explore.chart')}
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setIsTop100(true);
                    }}>
                    <View style={styles.touchArea}>
                      <Text
                        style={
                          isTop100
                            ? styles.chartTitleActive
                            : styles.chartTitleInactive
                        }>
                        {I18n.translate('explore.top100')}
                      </Text>
                    </View>
                  </Pressable>
                </View>

                {isTop100 ? (
                  <PlaylistList playlist={top100} isTop100 isHorizontal />
                ) : (
                  <PlaylistList
                    playlist={chartDummyData}
                    isChart
                    isHorizontal
                  />
                )}
              </View>

              <View style={styles.group}>
                <SectionTitle
                  title={I18n.translate('explore.latest-song')}
                  onClick={handleLatestSong}
                />

                {latestSong && (
                  <View style={styles.flatListContainer}>
                    {renderLatestSong()}
                  </View>
                )}
              </View>

              <View style={styles.group}>
                <SectionTitle
                  title={I18n.translate('explore.latest-album')}
                  onClick={handleLatestAlbum}
                />

                <PlaylistList playlist={latestAlbum} isAlbum isHorizontal />
              </View>

              <View>
                <SectionTitle
                  title={I18n.translate('explore.genre')}
                  onClick={handleGenreList}
                />

                <View style={styles.flatListContainer}>
                  <GenreSection genres={genreList} />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </BaseScreen>
    </>
  );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
