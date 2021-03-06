/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import NotFoundSong from '../../../assets/icons/not-found-song.svg';
import { Song } from '../../../models/song';
import { BaseScreen, Button, NotFoundItem, SongList } from '../../../shared/components';
import I18n from './../../../i18n';

const Device: React.FunctionComponent = () => {
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
                image_url: `file://${
                  RNFetchBlob.fs.dirs.DownloadDir
                }/${value.replace('mp3', 'jpg')}`,
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
        <View style={{marginVertical: 30, flex: 1}}>
          {songList.length ? (
            <SongList songs={songList} />
          ) : (
            <NotFoundItem
              icon={<NotFoundSong />}
              text={I18n.translate('device.not-found-song')}
            />
          )}
        </View>

        <Button disabled={false} onClick={fetchDownloadedSong} title={I18n.translate('device.refresh')} />
      </BaseScreen>
    </>
  );
};

export default Device;
