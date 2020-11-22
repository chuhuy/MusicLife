import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Screen } from '../shared/constance/screen';
import Setting from '../modules/home/setting';
import EditProfile from '../modules/home/setting/edit-profile';
import ChangePassword from '../modules/home/setting/change-password';

const SettingStack = createStackNavigator();

interface Props extends StateProps {
    route: any
}

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

const SettingNavigator: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <SettingStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <>
                    <SettingStack.Screen name={Screen.Setting.Main} component={Setting}/>
                    <SettingStack.Screen name={Screen.Setting.EditProfile} component={EditProfile}/>
                    <SettingStack.Screen name={Screen.Setting.ChangePassword} component={ChangePassword}/>
                </>
            </SettingStack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(SettingNavigator);
