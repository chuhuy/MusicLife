/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(({ data: { title, message } }) => {
    // Store notification in local storage
});

AppRegistry.registerComponent(appName, () => App);
