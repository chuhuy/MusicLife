import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import screen here
import Setting from './../modules/home/setting';
import { Personal } from './../modules/home/personal';
import { Explore } from './../modules/home/explore';
import I18n from './../i18n';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={I18n.translate('personal.title')}  component={Personal}/>
            <Tab.Screen name={I18n.translate('explore.title')}  component={Explore}/>
            <Tab.Screen name={I18n.translate('setting.title')}  component={Setting}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;