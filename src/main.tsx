import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {Setting} from './modules/home/setting';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainNavigator from './navigators/main-navigator';
import SQLite from 'react-native-sqlite-storage';

// Connect SQLite
const globalAny: any = global;
globalAny.db = SQLite.openDatabase(
    {
        name: 'db.db',
        location: 'default',
        createFromLocation: '~www/db.db',
    },
    () => {
        console.log("Connected to SQLite");
    },
    (error) => {
        console.log(error);
    }
)

interface Props {}

export const Main: React.FunctionComponent<Props> = (prop: Props) => {
    
    //TODO: Suspense fallback loading component

    return (
        <Provider store={store}>
            <NavigationContainer>
                <React.Suspense fallback={null}>
                    <MainNavigator />
                </React.Suspense>
            </NavigationContainer>
        </Provider>
    )
}