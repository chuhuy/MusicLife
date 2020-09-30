import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Setting} from './modules/home/setting';
import CounterScreen from './modules/counter';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import MainNavigator from './navigators/main-navigator';

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