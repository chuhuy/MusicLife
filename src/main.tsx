/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {Setting} from './modules/home/setting';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainNavigator from './navigators/main-navigator';
import SQLite from 'react-native-sqlite-storage';
import TrackPlayer from 'react-native-track-player';
import { RootSiblingParent } from 'react-native-root-siblings';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import QuickActions from 'react-native-quick-actions';

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
    }
);

interface Props {}

export const Main: React.FunctionComponent<Props> = (prop: Props) => {

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
          );
        });
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              );
            }
          });
    }, []);

    useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        const channelId = await notifee.createChannel({
            id: 'notification',
            name: 'Notification Channel',
            badge: true,
        });

        await notifee.displayNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                style: { type: AndroidStyle.BIGPICTURE, picture: remoteMessage.notification.android.imageUrl },
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
                    </React.Suspense>
                </NavigationContainer>
            </Provider>
        </RootSiblingParent>

    );
};
