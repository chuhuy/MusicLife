import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import screen here
import { Feed } from './../modules/home/feed';
import Setting from './../modules/home/setting';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed"  component={Feed}/>
            <Tab.Screen name="Setting"  component={Setting}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;