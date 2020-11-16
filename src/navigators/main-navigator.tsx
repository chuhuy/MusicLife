import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Splash from './../modules/splash';
// import Login from './../modules/authentication/login';
import TabNavigator from './tab-navigator';
// import Register from './../modules/authentication/register';
import ForgotPassword from './../modules/authentication/forgot-password';
import Player from './../modules/home/player';
import ChangePassword from '../modules/home/setting/change-password'
import Notification from './../modules/home/notification';
import EditProfile from '../modules/home/setting/edit-profile';
import Playlist from './../modules/home/playlist';
import Search from '../modules/home/search';
import Singer from '../modules/home/singer';
import LatestPlaylist from '../modules/home/explore/latest-playlist';

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
                        <Stack.Screen name="Splash" component={Splash}/>
                        {props.refresh_token === null && <Stack.Screen name="Login" component={Login}/>}
                        {props.refresh_token === null && <Stack.Screen name="Register" component={Register}/>}
                        {props.refresh_token === null && <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>}
                        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                        <Stack.Screen name="Player" component={Player}/>
                        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                        <Stack.Screen name="Notification" component={Notification}/>
                        <Stack.Screen name="EditProfile" component={EditProfile}/>
                        <Stack.Screen name="Playlist" component={Playlist}/>
                        <Stack.Screen name="Search" component={Search}/>
                        <Stack.Screen name="Singer" component={Singer}/>
                        <Stack.Screen name="LatestPlaylist" component={LatestPlaylist}/>
                    </>
                )}
                {/* {props.refresh_token === null ? (
                    <>
                        <Stack.Screen name="Splash" component={Splash}/>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Register" component={Register}/>
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    </>
                ) :
                (
                    <>
                        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                        <Stack.Screen name="Player" component={Player}/>
                        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage}/>
                        <Stack.Screen name="Notification" component={Notification}/>
                        <Stack.Screen name="EditProfile" component={EditProfile}/>
                        <Stack.Screen name="Playlist" component={Playlist}/>
                    </>

                )} */}
            </Stack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(MainNavigator);
