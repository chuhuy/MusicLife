/* eslint-disable @typescript-eslint/no-unused-vars */
import notifee, {
  AndroidImportance, AndroidStyle,

  AndroidVisibility
} from '@notifee/react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import QuickActions from 'react-native-quick-actions';
import { RootSiblingParent } from 'react-native-root-siblings';
import SQLite from 'react-native-sqlite-storage';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { Notification } from './models/notification';
import MainNavigator from './navigators/main-navigator';
// import {Setting} from './modules/home/setting';
import { store } from './redux/store';
import LoadingComponent from './shared/components/loading';
import { insertNotification } from './shared/helper/sqlite';

//  Set up quick action
QuickActions.setShortcutItems([
  {
    type: 'Message',
    title: 'Message',
    subtitle: 'Chat with friends',
    icon: 'message',
    userInfo: {
      url: 'app://orders',
    },
  },
  {
    type: 'Search',
    title: 'Search',
    subtitle: 'Search music',
    icon: 'search_icon',
    userInfo: {
      url: 'app://orders',
    },
  },
  {
    type: 'Shuffle',
    title: 'Shuffle',
    subtitle: 'Shuffle current playlist',
    icon: 'shuffle_icon',
    userInfo: {
      url: 'app://orders',
    },
  },
  {
    type: 'Play',
    title: 'Play',
    subtitle: 'Play music',
    icon: 'play_icon',
    userInfo: {
      url: 'app://orders',
    },
  },
]);

//  Set up Google Authentication
GoogleSignin.configure();

//  Set up player
TrackPlayer.setupPlayer().then(() => {});
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_STOP,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
  ],
});

// Connect SQLite
const globalAny: any = global;
globalAny.db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: '~www/db.db',
  },
  () => {
    console.log('Connected to SQLite');
  },
  (error) => {
    console.log(error);
  },
);

interface Props {}

export const Main: React.FunctionComponent<Props> = (prop: Props) => {
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const channelId = await notifee.createChannel({
        id: 'notification',
        name: 'Notification Channel',
        badge: true,
      });
      const time = new Date(Date.now());
      const newNotification: Notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image_url: remoteMessage.notification.android.imageUrl,
        created_at: time.toString(),
      };
      console.log(newNotification);
      insertNotification(newNotification);

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: remoteMessage.notification.android.imageUrl,
          },
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        },
      });
    });

    return unsubscribe;
  }, []);

  //TODO: Suspense fallback loading component

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <React.Suspense fallback={null}>
            <MainNavigator />
            <LoadingComponent />
          </React.Suspense>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
};
