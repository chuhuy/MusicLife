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
            <Tab.Screen name="Personal"  component={Personal} options={{title: I18n.translate('personal.title')}}/>
            <Tab.Screen name="Explore"  component={Explore} options={{title: I18n.translate('explore.title')}}/>
            <Tab.Screen name="Setting"  component={Setting} options={{title: I18n.translate('setting.title')}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
