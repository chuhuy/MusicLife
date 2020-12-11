import { useNetInfo } from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Device from '../modules/home/device';
import { toggleConnection } from '../redux/modules/network/action';
import { Screen } from '../shared/constance/screen';
import { styleVars } from '../shared/constance/style-variables';
import ForgotPassword from './../modules/authentication/forgot-password';
import Player from './../modules/home/player';
import Splash from './../modules/splash';
import TabNavigator from './tab-navigator';

const Stack = createStackNavigator();

interface Props extends StateProps, DispathProps {}

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
    network: state.network,
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleNetWork: () => dispatch(toggleConnection()),
});

const Login = React.lazy(() => import('./../modules/authentication/login'));
const Register = React.lazy(() => import('./../modules/authentication/register'));

const MainNavigator: React.FunctionComponent<Props> = (props: Props) => {
    let {
        network,
        toggleNetWork,
    } = props;
    let netInfo = useNetInfo();
    let { isConnected } = netInfo;
    
    useEffect(() => {
        
        console.log(isConnected);
        console.log(network)
        if (network !== isConnected) {
            toggleNetWork();
        }
    }, [netInfo.isConnected]);

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
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispathProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
