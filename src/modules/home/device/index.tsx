/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import {Genre} from '../../../models/genre';
import {Playlist} from '../../../models/playlist';
import {Song} from '../../../models/song';
import {BaseScreen, Button} from '../../../shared/components';
import HeaderMainPage from '../../../shared/components/header-main-page';
import { Screen } from '../../../shared/constance/screen';
import { playSong } from '../../../shared/helper/player';
import { pauseMusic, playMusic, skipMusic } from './../../../redux/modules/player/actions';
import I18n from './../../../i18n';
import RNFetchBlob from 'rn-fetch-blob';

interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
  return {
    skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
    playMusic: (song: Song) => dispatch(playMusic([song])),
    pauseMusic: () => dispatch(pauseMusic()),
  };
};
const mapStateToProps = (state: any) => ({
  refresh_token: state.auth.refresh_token,
});

const Device: React.FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation();
  const {playMusic} = props;

  const [isTop100, setTop100] = useState<boolean>(false);
  const [latestSong, setLatestSong] = useState<Array<Song>>(null);
  const [latestAlbum, setLatestAlbum] = useState<Array<Playlist>>(null);
  const [genreList, setGenreList] = useState<Array<Genre>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDownloadedSong();
  }, []);

  const fetchDownloadedSong = async () => {
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
        //   await downloadFile(title, url);
        RNFetchBlob.fs
          .ls(RNFetchBlob.fs.dirs.DownloadDir)
          .then((files) => {
              files = files.filter((value) => value.slice(-3) === 'mp3')
            console.log(files);
          })
          .catch((error) => console.log(error));
      } else {
        Alert.alert(I18n.translate('player.do-not-have-permission'));
      }
    } catch (err) {
      console.log(err);
    }
  };

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

    return (
        <>
          <BaseScreen isScroll={false}>
              <HeaderMainPage />

          {/* <Text style={{color: 'white'}}>Device screen</Text> */}
          <Button onClick={() => fetchDownloadedSong()} title="Refresh" />
      </BaseScreen>
    </>
  );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Device);
