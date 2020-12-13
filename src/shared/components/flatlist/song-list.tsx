import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import { addSongToPlaylist, fetchPersonalPlaylist } from '../../../api/personal';
import { Playlist } from '../../../models/playlist';
import {Song} from '../../../models/song';
import {
  pauseMusic,
  playMusic,
  togglePlayMusic,
} from '../../../redux/modules/player/actions';
import {Screen} from '../../constance/screen';
import {playSong} from '../../helper/player';
import { Button } from '../button';
import ModalBottom from '../modal-bottom';
import { notify } from '../notify';
import SongOptions from '../option-list/SongOptions';
import {Item} from './item';
import PlaylistList from './playlist';
import I18n from '../../../i18n';

interface Props extends DispatchProps, StateProps {
  songs: Array<Song>;
  disableScroll?: boolean;
  children?: any;
  onEndReached?: () => void;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    playMusic: (song: Song) => dispatch(playMusic([song])),
    pauseMusic: () => dispatch(pauseMusic()),
    togglePlayMusic: () => dispatch(togglePlayMusic()),
  };
};
const mapStateToProps = (state: any) => ({
  isPlaying: state.player.isPlaying,
  access_token: state.auth.access_token,
});

const List: React.FunctionComponent<Props> = (props: Props) => {
  const {
    songs,
    access_token,
    disableScroll,
    togglePlayMusic,
    children,
    onEndReached,
    isPlaying,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [songModal, setSongModal] = useState<any>(null);
  const navigation = useNavigation();
  const [personalPlaylist, setPersonalPlaylist] = useState<Array<Playlist>>([]);

  const handlePlayMusic = async (song) => {
    console.log('play music');
    try {
      playSong([song])
        .then(() => {
          navigation.navigate(Screen.Common.Player);
        });
    } catch (err) {
      TrackPlayer.pause().then(() => {
        if (isPlaying) {
          togglePlayMusic();
        }
      });
    }
  };

  const handleOpenOption = (song) => {
    setSongModal(song);
    setIsVisible(true);
    console.log(song);
  };

  const handleAddToPlaylist = () => {
    if (songModal) {
      fetchPersonalPlaylist(access_token)
        .then((data) => {
          setPersonalPlaylist(data.personalPlaylist);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setPersonalPlaylist([]);
  };

  const addSong = (playlist_id: number) => {
    addSongToPlaylist(access_token, songModal.music_id, playlist_id)
      .then(() => {
        notify(I18n.translate('common.add-song-playlist'));
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        notify(I18n.translate('common.add-song-playlist-fail'));
        handleCloseModal();
      });
  };

  const renderItem = (item: Song) => {
    return (
      <Item
        key={item.music_id}
        name={item.title}
        image={item.image_url}
        artist={item.artists}
        onClick={() => handlePlayMusic(item)}
        onOptionClick={() => handleOpenOption(item)}
      />
    );
  };

  const renderPlaylist = () => {
    return (
      <>
        {/* <Button
          title={I18n.translate('personal.add-playlist')} 
          onClick={}
        /> */}
        <PlaylistList
          playlist={personalPlaylist}
          onClick={addSong}
        />
      </>
    );
  };

  return (
    <>
      {songs?.length ? (
        <>
          {songs?.length ? (
            <View>
              {disableScroll ? (
                <View style={styles.flatListContainer}>
                  {songs.map((item) => renderItem(item))}
                  <View style={styles.flatListFooter}>{children}</View>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.flatListContainer}
                  data={songs}
                  renderItem={({item}) => renderItem(item)}
                  keyExtractor={(item) => item.music_id.toString()}
                  ListFooterComponent={children}
                  ListFooterComponentStyle={
                    children && {...styles.flatListFooter}
                  }
                  onEndReached={onEndReached}
                />
              )}
              <ModalBottom
                isVisible={isVisible}
                onHide={handleCloseModal}
                item={songModal}>
                {personalPlaylist.length ? renderPlaylist() : (
                  <SongOptions
                    song={songModal}
                    handleAddToPlaylist={handleAddToPlaylist}
                    closeModal={handleCloseModal}
                  />
                )}
              </ModalBottom>
            </View>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  flatListContainer: {
    marginVertical: -15,
  },
  flatListFooter: {
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
