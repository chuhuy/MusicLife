import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';
import Search from '../modules/home/search';
import Singer from '../modules/home/singer';
import { Screen } from '../shared/constance/screen';
// import Register from './../modules/authentication/register';
import ForgotPassword from './../modules/authentication/forgot-password';
import Notification from './../modules/home/notification';
import Player from './../modules/home/player';
import Splash from './../modules/splash';
// import Login from './../modules/authentication/login';
import TabNavigator from './tab-navigator';

const Stack = createStackNavigator();

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

// const Splash = React.lazy(() => import('./../modules/splash'));
const Login = React.lazy(() => import('./../modules/authentication/login'));
// const TabNavigator = React.lazy(() => import('./tab-navigator'));
const Register = React.lazy(() => import('./../modules/authentication/register'));
// const ForgotPassword = React.lazy(() => import('./../modules/authentication/forgot-password'));
// const Player = React.lazy(() => import('./../modules/home/player'));
// const ChangePassword = React.lazy(() => import('../modules/home/change-password'));
// const ChangeLanguage = React.lazy(() => import('../modules/home/change-language'));
// const Notification = React.lazy(() => import('../modules/home/notification'));
// const EditProfile = React.lazy(() => import('../modules/home/edit-profile'));
// const Playlist = React.lazy(() => import('./../modules/home/playlist'));

const MainNavigator: React.FunctionComponent<Props> = (props: Props) => {

    //TODO: Splash Screen

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
                        {props.refresh_token === null && <Stack.Screen name={Screen.Authentication.Login} component={Login}/>}
                        {props.refresh_token === null && <Stack.Screen name={Screen.Authentication.Register} component={Register}/>}
                        {props.refresh_token === null && <Stack.Screen name={Screen.Authentication.ForgotPassword} component={ForgotPassword}/>}
                        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                        <Stack.Screen name={Screen.Common.Player} component={Player}/>
                        <Stack.Screen name={Screen.Common.Notification} component={Notification}/>
                        {/* <Stack.Screen name={Screen.Common.Search} component={Search}/> */}
                        {/* <Stack.Screen name={Screen.Common.Singer} component={Singer}/> */}
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(MainNavigator);
