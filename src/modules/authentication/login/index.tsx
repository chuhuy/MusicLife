/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { Button } from './../../../shared/components/button';
import { LOGIN } from './../../../redux/modules/auth/actions';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import I18n from './../../../i18n';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginUser } from './../../../models/LoginUser';

interface Props extends DispatchProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (payload: any) => dispatch({type: LOGIN, payload}),
    };
};

const Login: React.FunctionComponent<Props> = (props: Props) => {
    //  Response from API getToken
    const [loginUser, setLoginUser] = useState<LoginUser>({
        username: 'user',
        refresh_token: 'refreshtoken',
        token: 'token',
    });

    // Login
    const handleLogin = () => {
        props.login(loginUser);
    };

    // Form control
    const initialFormValue = {
        username: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        // username: Yup.string().required(),
        // password: Yup.string().required()
    });

    return (
        <>
            <Formik
                initialValues={initialFormValue}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                {({values, handleChange, setFieldTouched, touched, errors, handleSubmit}) =>
                    <React.Fragment>
                        <Text>{I18n.translate('authentication.login.username')}</Text>
                        <TextInput
                            value={values.username}
                            onChange={handleChange('username')}
                            onBlur={() => setFieldTouched('username')}
                            placeholder={I18n.translate('authentication.login.username-placeholder')}
                        />
                        {touched.username && errors.username &&
                            <Text style={styles.error}>{errors.username}</Text>
                        }
                        <Text>{I18n.translate('authentication.login.password')}</Text>
                        <TextInput
                            value={values.password}
                            onChange={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            placeholder={I18n.translate('authentication.login.password-placeholder')}
                        />
                        {touched.password && errors.password &&
                            <Text style={styles.error}>{errors.password}</Text>
                        }
                        <Button title={I18n.translate('authentication.login.login')} onClick={() => handleSubmit()}/>
                        <LoginButton
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log('login has error: ' + result.error);
                                    } else if (result.isCancelled) {
                                        console.log('login is cancelled.');
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(`${data.accessToken}`);
                                        }
                                        );
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log('logout.')}/>
                    </React.Fragment>
                }
            </Formik>
            {/* <View style={styles.container}>
                <Text>Login Screen</Text>
                <Button title="Login" onClick={handleLogin}/>
            </View> */}
        </>
    );
};

export default connect(null, mapDispatchToProps)(Login);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
