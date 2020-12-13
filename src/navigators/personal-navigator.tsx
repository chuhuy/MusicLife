import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Screen } from '../shared/constance/screen';
import { screenOptions } from './explore-navigator';

const PersonalStack = createStackNavigator();

const Personal = React.lazy(() => import('../modules/home/personal'));
const NotificationScreen =  React.lazy(() => import('../modules/home/notification'));
const PlaylistDetail =  React.lazy(() => import('../modules/home/playlist-detail'));
const Search =  React.lazy(() => import('../modules/home/search'));
const Singer =  React.lazy(() => import('../modules/home/singer'));

const ExploreNavigator: React.FunctionComponent = () => {
    return (
        <>
            <PersonalStack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <>
                    <PersonalStack.Screen name={Screen.Personal} component={Personal}/>

                    <PersonalStack.Screen name={Screen.Common.Search} component={Search}/>

                    <PersonalStack.Screen name={Screen.Common.Singer} component={Singer}/>

                    <PersonalStack.Screen
                        name={Screen.Common.Notification}
                        component={NotificationScreen}
                        options={screenOptions}/>

                    <PersonalStack.Screen
                        name={Screen.Common.PlaylistDetail}
                        component={PlaylistDetail}
                    />
                </>
            </PersonalStack.Navigator>
        </>
    );
};

export default ExploreNavigator;
