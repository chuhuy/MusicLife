/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {Setting} from './modules/home/setting';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainNavigator from './navigators/main-navigator';
import SQLite from 'react-native-sqlite-storage';
import TrackPlayer from 'react-native-track-player';
import TrackService from './services/track-player';
import { RootSiblingParent } from 'react-native-root-siblings';

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
