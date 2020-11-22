/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../shared/constance/screen';
import ExploreActiveIcon from './../assets/icons/explore-active.svg';
import ExploreIcon from './../assets/icons/explore.svg';
import PersonalActiveIcon from './../assets/icons/personal-active.svg';
import PersonalIcon from './../assets/icons/personal.svg';
import SettingActiveIcon from './../assets/icons/setting-active.svg';
import SettingIcon from './../assets/icons/setting.svg';
import I18n from './../i18n';
import PersonalStackScreen from './personal-navigator';
import { styleVars } from './../shared/constance/style-variables';
import ExploreStackScreen from './explore-navigator';
import SettingStackScreen from './setting-navigator';

const Tab = createBottomTabNavigator();

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

interface Props extends StateProps {}

const TabNavigator: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: styleVars.lightPrimaryColor,
                inactiveBackgroundColor: styleVars.lightPrimaryColor,
                keyboardHidesTabBar: true,
                style: {height: 60},
            }}
            screenOptions={({route}) => ({
                tabBarLabel: ({focused}) => {
                    if (route.name === Screen.Explore.Main) {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : styleVars.white, fontSize: 12}}>{I18n.translate('explore.title')}</Text>
                        );
                    } else if (route.name === Screen.Personal) {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : styleVars.white, fontSize: 12}}>{I18n.translate('personal.title')}</Text>
                        );
                    } else if (route.name === Screen.Setting.Main) {
                        return (
                            <Text style={{color: focused ? styleVars.secondaryColor : styleVars.white, fontSize: 12}}>{I18n.translate('setting.title')}</Text>
                        );
                    }
                },
                tabBarIcon: ({focused}) => {
                    if (route.name === Screen.Explore.Main) {
                        if (!focused) {return (<ExploreIcon/>);}
                        else {return (<ExploreActiveIcon/>);}
                    } else if (route.name === Screen.Personal) {
                        if (!focused) {return (<PersonalIcon/>);}
                        else {return (<PersonalActiveIcon/>);}
                    } else if (route.name === Screen.Setting.Main) {
                        if (!focused) {return (<SettingIcon/>);}
                        else {return (<SettingActiveIcon/>);}
                    }
                },
            })}
        >
            <Tab.Screen name={Screen.Explore.Main}  component={ExploreStackScreen} options={{title: I18n.translate('explore.title')}}/>
            {props.refresh_token !== null && <Tab.Screen name={Screen.Personal}  component={PersonalStackScreen} options={{title: I18n.translate('personal.title')}}/>}
            <Tab.Screen name={Screen.Setting.Main}  component={SettingStackScreen} options={{title: I18n.translate('setting.title')}}/>
        </Tab.Navigator>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(TabNavigator);
