/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import screen here
import Setting from './../modules/home/setting';
import { Personal } from './../modules/home/personal';
import { Explore } from './../modules/home/explore';
import I18n from './../i18n';
import { Text } from 'react-native';
import { styleVars } from './../shared/constance/style-variables';
import ExploreIcon from './../assets/icons/explore.svg';
import PersonalIcon from './../assets/icons/personal.svg';
import SettingIcon from './../assets/icons/setting.svg';
import ExploreActiveIcon from './../assets/icons/explore-active.svg';
import PersonalActiveIcon from './../assets/icons/personal-active.svg';
import SettingActiveIcon from './../assets/icons/setting-active.svg';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: styleVars.lightPrimaryColor,
                inactiveBackgroundColor: styleVars.lightPrimaryColor,
                keyboardHidesTabBar: true,
                style: {height: 50},
            }}
            screenOptions={({route}) => ({
                tabBarLabel: ({focused}) => {
                    if (route.name === 'Explore') {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : 'white', fontSize: 12}}>{I18n.translate('explore.title')}</Text>
                        );
                    } else if (route.name === 'Personal') {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : 'white', fontSize: 12}}>{I18n.translate('personal.title')}</Text>
                        );
                    } else if (route.name === 'Setting') {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : 'white', fontSize: 12}}>{I18n.translate('setting.title')}</Text>
                        );
                    }
                },
                tabBarIcon: ({focused}) => {
                    if (route.name === 'Explore') {
                        if (!focused) {return (<ExploreIcon/>);}
                        else {return (<ExploreActiveIcon/>);}
                    } else if (route.name === 'Personal') {
                        if (!focused) {return (<PersonalIcon/>);}
                        else {return (<PersonalActiveIcon/>);}
                    } else if (route.name === 'Setting') {
                        if (!focused) {return (<SettingIcon/>);}
                        else {return (<SettingActiveIcon/>);}
                    }
                },
            })}
        >
            <Tab.Screen name="Explore"  component={Explore} options={{title: I18n.translate('explore.title')}}/>
            <Tab.Screen name="Personal"  component={Personal} options={{title: I18n.translate('personal.title')}}/>
            <Tab.Screen name="Setting"  component={Setting} options={{title: I18n.translate('setting.title')}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
