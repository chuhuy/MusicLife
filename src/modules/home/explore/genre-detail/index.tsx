/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import {fetchGenreDetail} from '../../../../api/explore';
import {songs} from '../../../../data';
import I18n from '../../../../i18n';
import {Playlist} from '../../../../models/playlist';
import {Song} from '../../../../models/song';
import { disableLoading, enableLoading } from '../../../../redux/modules/loading/actions';
import {
  BaseScreen,
  LoadingLayer,
  SectionTitle,
} from '../../../../shared/components';
import {
  PlaylistList,
  SongList,
} from '../../../../shared/components/flatlist';
import {Screen} from '../../../../shared/constance/screen';
import {MoreButton} from '../../search/components/more-button';
import {styles} from './styles';

interface Props extends DispatchProps {
  navigation: any;
  route: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    enableLoading: () => dispatch(enableLoading()),
    disableLoading: () => dispatch(disableLoading()),
  };
};

const GenreDetail: React.FunctionComponent<Props> = (props: Props) => {
  const {
    navigation,
    route,
    enableLoading,
    disableLoading,
  } = props;
  const {genre} = route.params;
  const [songList, setSongList] = useState<Array<Song>>([]);
  const [albumList, setAlbumList] = useState<Array<Playlist>>([]);

  useEffect(() => {
    enableLoading();

    fetchGenreDetail(genre.genre_id)
      .then((data) => {
        setSongList(data.songsByGenre);
        setAlbumList(data.albumsByGenre);
        disableLoading();
      })
      .catch((err) => {
        disableLoading();
        console.log(err);
      });
  }, []);

  const handleSongList = () => {
    navigation.navigate(Screen.Common.Song, {
      songs,
      genre_id: genre.genre_id,
      isLatest: false,
    });
  };

  const handleAlbumList = () => {
    navigation.navigate(Screen.Common.Playlist, {
      isAlbum: true,
      genre_id: genre.genre_id,
      isLatest: false,
    });
  };

  return (
    <>
      <BaseScreen isScroll={true}>
        {songList.length ? (
          <View style={styles.section}>
            <SectionTitle
              title={I18n.translate('search.songs')}
              onClick={handleSongList}
            />

            <SongList disableScroll={true} songs={songList}>
              <MoreButton onClick={handleSongList} />
            </SongList>
          </View>
        ) : null}

        {albumList.length ? (
          <View style={{marginTop: -5}}>
            <SectionTitle
              title={I18n.translate('search.albums')}
              onClick={handleAlbumList}
            />

            <PlaylistList playlist={albumList} isHorizontal={true}>
              <MoreButton onClick={handleAlbumList} />
            </PlaylistList>
          </View>
        ) : null}
      </BaseScreen>
    </>
  );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(GenreDetail);
