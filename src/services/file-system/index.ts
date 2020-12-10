import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const requestToPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Music',
        message: 'App needs access to your Files... ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const downloadFile = async (
  title: string,
  url: string,
  artists: string,
) => {
  try {
    RNFetchBlob.config({
      fileCache: true,
      // appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: title,
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${title} - ${artists}.mp3`, // Android platform
        description: 'Downloading the file',
      },
    })
      .fetch('GET', url)
      .then((res) => {
        console.log('The file is save to ', res.path());
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    console.log(error);
  }
};
