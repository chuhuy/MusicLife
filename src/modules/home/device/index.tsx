/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, View} from 'react-native';
import {connect} from 'react-redux';
import {Song} from '../../../models/song';
import {BaseScreen, Button, SongList} from '../../../shared/components';
import HeaderMainPage from '../../../shared/components/header-main-page';
import {
  pauseMusic,
  playMusic,
  skipMusic,
} from './../../../redux/modules/player/actions';
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
  const [songList, setSongList] = useState<Array<Song>>([]);

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
        RNFetchBlob.fs
          .ls(RNFetchBlob.fs.dirs.DownloadDir)
          .then((files) => {
            files = files.filter((value) => value.slice(-3) === 'mp3');
            const songsList = files.map((value, index) => {
              const song: Song = {
                music_id: index,
                title: value.split('-')[0].trim(),
                image_url: `file://${RNFetchBlob.fs.dirs.DownloadDir}/${value.replace('mp3', 'jpg')}`,
                artists: value.split('-')[1].trim().replace('.mp3', ''),
                url: `${RNFetchBlob.fs.dirs.DownloadDir}/${value}`,
              };
              return song;
            });
            setSongList(songsList);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Alert.alert(I18n.translate('player.do-not-have-permission'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BaseScreen isScroll={false}>
        <HeaderMainPage />
        <Button onClick={() => fetchDownloadedSong()} title="Refresh" />
        <View style={{marginTop: 30}}>
          <SongList songs={songList} />
        </View>
      </BaseScreen>
    </>
  );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Device);
