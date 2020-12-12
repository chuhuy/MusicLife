import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NotificationScreen from '../modules/home/notification';
import Personal from '../modules/home/personal';
import Search from '../modules/home/search';
import Singer from '../modules/home/singer';
import { Screen } from '../shared/constance/screen';
import { screenOptions } from './explore-navigator';

const PersonalStack = createStackNavigator();

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
                </>
            </PersonalStack.Navigator>
        </>
    );
};

export default ExploreNavigator;
