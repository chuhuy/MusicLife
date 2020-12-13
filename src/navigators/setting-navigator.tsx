import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import I18n from '../i18n';
import Setting from '../modules/home/setting';
import ChangePassword from '../modules/home/setting/change-password';
import EditProfile from '../modules/home/setting/edit-profile';
import { Screen } from '../shared/constance/screen';
import { screenOptions } from './explore-navigator';

const SettingStack = createStackNavigator();

const SettingNavigator: React.FunctionComponent = () => {
    return (
        <>
            <SettingStack.Navigator
                screenOptions={screenOptions}
            >
                <>
                    <SettingStack.Screen
                        name={Screen.Setting.Main}
                        component={Setting}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <SettingStack.Screen
                        name={Screen.Setting.EditProfile}
                        component={EditProfile}
                        options={{
                            title: I18n.translate('setting.editProfile'),
                        }}
                    />

                    <SettingStack.Screen
                        name={Screen.Setting.ChangePassword}
                        component={ChangePassword}
                        options={{
                            title: I18n.translate('setting.change-password'),
                        }}
                    />
                </>
            </SettingStack.Navigator>
        </>
    );
};

export default SettingNavigator;
