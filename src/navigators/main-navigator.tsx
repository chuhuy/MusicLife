import { useNetInfo } from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleConnection } from '../redux/modules/network/action';
import { Screen } from '../shared/constance/screen';

const Stack = createStackNavigator();

interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (state: any) => ({
    access_token: state.auth.access_token,
    network: state.network,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleConnect: (isConnected: boolean) => dispatch(toggleConnection(isConnected)),
    };
};

const Login = React.lazy(() => import('../modules/authentication/login'));
const Register = React.lazy(() => import('../modules/authentication/register'));
const ForgotPassword = React.lazy(() => import('./../modules/authentication/forgot-password'));
const Player = React.lazy(() => import('./../modules/home/player'));
const Splash = React.lazy(() => import('./../modules/splash'));
const TabNavigator = React.lazy(() => import('./tab-navigator'));

const MainNavigator: React.FunctionComponent<Props> = (props: Props) => {
    const { toggleConnect } = props;
    const netInfo = useNetInfo();
    const { isConnected } = netInfo;

    useEffect(() => {
        toggleConnect(isConnected);
    }, [isConnected]);

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
                        {!props.access_token && <Stack.Screen name={Screen.Authentication.Login} component={Login}/>}
                        {!props.access_token && <Stack.Screen name={Screen.Authentication.Register} component={Register}/>}
                        {!props.access_token && <Stack.Screen name={Screen.Authentication.ForgotPassword} component={ForgotPassword}/>}
                        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                        <Stack.Screen name={Screen.Common.Player} component={Player}/>
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
