import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    token: state.auth.token
});

const Login = React.lazy(() => import ('./../modules/authentication/login'));
const TabNavigator = React.lazy(() => import('./tab-navigator'));

const MainNavigator: React.FunctionComponent<Props> = (props: Props) => {

    //TODO: Splash Screen

    return (
        <>
            <Stack.Navigator>
                {props.token == null ? (
                    <Stack.Screen name="Login" component={Login}/>
                ) : 
                (
                    <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                )}
            </Stack.Navigator>
        </>
    )
}

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(MainNavigator);