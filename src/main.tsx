/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {Setting} from './modules/home/setting';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainNavigator from './navigators/main-navigator';
import SQLite from 'react-native-sqlite-storage';
import TrackPlayer from 'react-native-track-player';
import TrackService from './services/track-player';
import { RootSiblingParent } from 'react-native-root-siblings';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import notifee, { AndroidStyle, AndroidImportance, AndroidVisibility } from '@notifee/react-native';

//  Set up player
TrackPlayer.setupPlayer().then(() => {});
TrackPlayer.registerPlaybackService(() => TrackService);
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
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
          );
        });

        // Check whether an initial notification is available
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
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
