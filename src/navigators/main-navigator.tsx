import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';
import { Screen } from '../shared/constance/screen';
import ForgotPassword from './../modules/authentication/forgot-password';
import Player from './../modules/home/player';
import Splash from './../modules/splash';
import TabNavigator from './tab-navigator';

const Stack = createStackNavigator();

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
    network: state.network,
});

const Login = React.lazy(() => import('./../modules/authentication/login'));
const Register = React.lazy(() => import('./../modules/authentication/register'));

const MainNavigator: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {(
                    <>
                        <Stack.Screen name={Screen.Splash} component={Splash}/>
                        {props.refresh_token && <Stack.Screen name={Screen.Authentication.Login} component={Login}/>}
                        {props.refresh_token && <Stack.Screen name={Screen.Authentication.Register} component={Register}/>}
                        {props.refresh_token && <Stack.Screen name={Screen.Authentication.ForgotPassword} component={ForgotPassword}/>}
                        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                        <Stack.Screen name={Screen.Common.Player} component={Player}/>
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(MainNavigator);
