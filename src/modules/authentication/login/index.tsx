/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
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
import { SignInForm } from '../../../models/form/signin';
import { ErrorMessage } from './../../../models/error-message';

interface Props extends DispatchProps {
    navigation: any,
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (payload: any) => dispatch({type: LOGIN, payload}),
    };
};

const Login: React.FunctionComponent<Props> = (props: Props) => {
    //  Error message list
    const [errorMessageList, setErrorMessageList] = useState<ErrorMessage[]>([]);
    //  Password visibility
    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
    //  Response from API getToken
    const [loginUser, setLoginUser] = useState<LoginUser>({
        username: 'user',
        refresh_token: 'refresh_token',
        token: 'token',
    });

    // Form control
    const initialFormValue = {
        username: '',
        password: '',
    };
    //  Validate form
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .max(40, I18n.translate('authentication.login.err-length-username'))
            .required(I18n.translate('authentication.login.err-required-username')),

        password: Yup.string()
            .min(8, I18n.translate('authentication.login.err-length-password'))
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, I18n.translate('authentication.login.err-regex-password'))
            .required(I18n.translate('authentication.login.err-required-password')),
    });
    const validateForm = (values: SignInForm) => {
        validationSchema.validate(values, {abortEarly: false})
        .then(() => {
            //  Validate successfully
            handleSignIn(values.username, values.password);
        })
        .catch((errors) => {
            setErrorMessageList((errors.inner.map((error: any, index: number) => {
                console.log(error);
                return {
                    id: index,
                    message: error.message,
                };
            })));
        });
    };

    //  Toggle show password
    const toggleShowPassword = () => {
        setPasswordShown(!isPasswordShown);
    };

    // Login
    const handleSignIn = (username: string, password: string) => {
        props.login({
            email: username,
            password: password,
        });
    };

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
        props.navigation.navigate('Register');
    };

    const handleForgotPassword = () => {
        props.navigation.navigate('ForgotPassword');
    };

    // Render Toast Error Message
    const renderErrorMessage = msg => {
        return <Text style={styles.error}>{msg}</Text>
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                scrollEnabled={false}
                contentContainerStyle={styles.container}
            >
                <View style={styles.headerContainer}>
                    <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/>
                    <Text style={styles.appName}>Life Music</Text>            
                </View>

                <Formik
                    initialValues={initialFormValue}
                    onSubmit={(values) => {validateForm(values);}}
                    validationSchema={validationSchema}
                >
                    {({values, handleChange, errors, handleSubmit, handleBlur, setFieldTouched, touched}) =>
                        <React.Fragment>
                            <View style={styles.bodyContainer}>
                                <View style={styles.formContainer}>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.username')}</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            onBlur={() => { handleBlur('username'); setFieldTouched('username')}}
                                            placeholder={I18n.translate('authentication.login.username-placeholder')}
                                        />
                                        { touched.username && errors.username && renderErrorMessage(errors.username) }
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.password')}</Text>
                                        <TextInput
                                            secureTextEntry={!isPasswordShown}
                                            style={styles.textInput}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => { handleBlur('password'); setFieldTouched('password')}}
                                            placeholder={I18n.translate('authentication.login.password-placeholder')}
                                        />
                                        { touched.password && errors.password && renderErrorMessage(errors.password) }
                                    </View>

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
                                </View>

                                <View style={styles.linkButtonGroup}>
                                    <LinkButton title={I18n.translate('authentication.login.signup')} color="#fff" onClick={() => handleSignUp()}/>
                                    <LinkButton title={I18n.translate('authentication.login.forgot-password')} color="#fff" onClick={() => handleForgotPassword()}/>
                                </View>
                            </View>   
                        </React.Fragment>
                    }
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default connect(null, mapDispatchToProps)(Login);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
