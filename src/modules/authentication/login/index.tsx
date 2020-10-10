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
import { LoginManager } from 'react-native-fbsdk';
import { LoginUser } from './../../../models/LoginUser';
import { FacebookButton, GoogleButton, LinkButton } from './../../../shared/components';

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
        refresh_token: 'refresh_token',
        token: 'token',
    });

    // Login
    const handleSignIn = () => {
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

    const handleSignInWithFacebook = () => {
        LoginManager.logInWithPermissions(['email']).then(
            function (result) {
              if (result.isCancelled) {
                console.log('Login cancelled');
              } else {
                console.log('Login success with permissions: ' + result.grantedPermissions.toString());
              }
            },
            function (error) {
              console.log('Login fail with error: ' + error);
            }
          );
    };

    const handleSignInWithGoogle = () => {
        console.log('Signed in with google');
    };

    const handleSignUp = () => {
        console.log('Signed up');
    };

    const handleForgotPassword = () => {
        console.log('Forgot password');
    };

    return (
        <>
            <Formik
                initialValues={initialFormValue}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
                {({values, handleChange, setFieldTouched, touched, errors, handleSubmit}) =>
                    <React.Fragment>
                        <View style={styles.container}>
                            <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.username')}</Text>
                            <TextInput
                                style={styles.textInput}
                                value={values.username}
                                onChange={handleChange('username')}
                                onBlur={() => setFieldTouched('username')}
                                placeholder={I18n.translate('authentication.login.username-placeholder')}
                            />
                            {touched.username && errors.username &&
                                <Text style={styles.error}>{errors.username}</Text>
                            }
                            <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.password')}</Text>
                            <TextInput
                                style={styles.textInput}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                placeholder={I18n.translate('authentication.login.password-placeholder')}
                            />
                            {touched.password && errors.password &&
                                <Text style={styles.error}>{errors.password}</Text>
                            }
                            <View style={styles.signInButton}>
                                <Button title={I18n.translate('authentication.login.signin')} onClick={() => handleSubmit()}/>
                            </View>
                            <View style={styles.separator}>
                                <View style={styles.separatorLine}/>
                                <Text style={styles.separatorLabel}>{I18n.translate('authentication.login.or')}</Text>
                                <View style={styles.separatorLine}/>
                            </View>
                            <View style={styles.buttonGroup}>
                                <FacebookButton onClick={() => handleSignInWithFacebook()} />
                                <GoogleButton onClick={() => handleSignInWithGoogle()}/>
                            </View>
                            <View style={styles.linkButtonGroup}>
                                <LinkButton title={I18n.translate('authentication.login.signup')} onClick={() => handleSignUp()}/>
                                <LinkButton title={I18n.translate('authentication.login.forgot-password')} onClick={() => handleForgotPassword()}/>
                            </View>
                        </View>
                    </React.Fragment>
                }
            </Formik>
        </>
    );
};

export default connect(null, mapDispatchToProps)(Login);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
