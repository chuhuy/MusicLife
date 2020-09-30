import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import { Button } from './../../../shared/components/button';
import { LOGIN } from './../../../redux/modules/auth/actions';
import { connect } from 'react-redux'

interface Props extends DispatchProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (payload) => dispatch({type: LOGIN, payload}),
    }
}

const Login: React.FunctionComponent<Props> = (props: Props) => {
    
    //  Response from API getToken
    const loginUser = {
        token: 'token',
        refresh_token: 'refresh_token'
    }

    const handleLogin = () => {
        props.login(loginUser)
    }
    
    return(
        <>
            <View style={styles.container}>
                <Text>Login Screen</Text>
                <Button title="Login" onClick={handleLogin}/>
            </View>
        </>
    )
}

export default connect(null, mapDispatchToProps)(Login);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
