/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { SignInForm } from '../../../models/form/signin';
import { notifyError } from '../../../shared/components/notify';
import I18n from './../../../i18n';
import { ErrorMessage } from './../../../models/error-message';
import { LoginUser } from './../../../models/LoginUser';
import { loginUsername, loginEmail, loginFacebook } from './../../../redux/modules/auth/actions';
import { FacebookButton, GoogleButton, LinkButton } from './../../../shared/components';
import { Button } from './../../../shared/components/button';
import { styles } from './styles';
import { styleVars } from '../../../shared/constance/style-variables';
import { ReduxCallbacks } from '../../../models/redux/ReduxCallback';
import { Messages } from '../../../shared/constance/messages';
import TextInputGroup from '../../../shared/components/form/textInput';

interface Props extends DispatchProps, StateProps {
    navigation: any,
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoginUsername: (user: SignInForm, callbacks?: ReduxCallbacks) => dispatch(loginUsername(user, callbacks)),
        onLoginEmail: (user: SignInForm, callbacks?: ReduxCallbacks) => dispatch(loginEmail(user, callbacks)),
        onLoginFacebook: (access_token: string, callbacks?: ReduxCallbacks) => dispatch(loginFacebook(access_token, callbacks)),
    };
};

const Login: React.FunctionComponent<Props> = (props: Props) => {
    const { loading, onLoginUsername, onLoginEmail, onLoginFacebook } = props;
    
    // Loading
    useEffect(() => {
        console.log(loading);
    }, [loading])

    //  Error message list
    const [errorMessageList, setErrorMessageList] = useState<ErrorMessage[]>([]);
    //  Password visibility
    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
    //  Response from API getToken
    const [loginUser, setLoginUser] = useState<LoginUser>({
        username: 'user',
        refresh_token: 'refresh_token',
        access_token: 'token',
    });
    // Empty input
    const [isEmptyInput, setEmptyInput] = useState<boolean>(true);

    // Form control
    const initialFormValue = {
        username: '',
        password: '',
    };
    //  Validate form
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .max(40, 'Sign in failed')
            .matches(/(^(.+@[a-z0-9]+\.[a-z]{2,4})$)|(^\w*[^\@]\w*$)/g, 'Sign in failed')
            .required('Sign in failed'),

        password: Yup.string()
            .min(8, 'Sign in failed')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Sign in failed')
            .required('Sign in failed'),
    });
    const validateForm = (values: SignInForm) => {
        validationSchema.validate(values, {abortEarly: false})
        .then(() => {
            //  Validate successfully
            handleSignIn(values);
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
    const handleSignIn = (values: SignInForm) => {
        console.log(values)
        if (/^.+@.+$/.test(values.username)) 
            onLoginEmail(values, {
                onFailed: error =>  renderToast({ error })
            });
        else onLoginUsername(values,{
            onFailed: error =>  renderToast({ error })
        });
    };

    const handleSignInWithFacebook = async () => {
        LoginManager.logInWithPermissions(['email']).then(
            async function (result) {
                if (result.isCancelled) {
                    renderToast({ cancelLogin: 'Cancel login' });
                    console.log('Login cancelled');
                } else {
                    const { accessToken } = await AccessToken.getCurrentAccessToken();
                    console.log(accessToken);
                    onLoginFacebook(accessToken, {
                        onFailed: error =>  renderToast({ error })
                    })
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString());
                }
            },
            function (error) {
                renderToast({ error });
                console.log('Login fail with error: ' + error);
            }
          );
    };

    const handleSignInWithGoogle = () => {
        console.log('Signed in with google');
    };

    const handleSignUp = () => {
        if (isPasswordShown) toggleShowPassword();
        props.navigation.navigate('Register');
    };

    const handleForgotPassword = () => {
        props.navigation.navigate('ForgotPassword');
    };

    // Render Toast Error Message
    const renderToast = errors => {
        const keys = Object.keys(errors);
        const totalErrors = keys.length;
        console.log(errors)
        if (totalErrors){
            let errorMessage = '';

            if (totalErrors === 2){
                errorMessage = I18n.translate('authentication.login.account-not-exist');
            } else {
                let error = errors[keys[0]];

                switch (error){
                    case Messages.Auth.IncorrectPassword:
                        errorMessage = I18n.translate('authentication.login.incorrect-password');
                        break;
                    case Messages.Auth.AccountNotExist:
                        errorMessage = I18n.translate('authentication.login.account-not-exist');
                        break;
                    default:
                        errorMessage = I18n.translate('authentication.login.fail-to-sign-in');
                }
            }

            notifyError(errorMessage, {position: Toast.positions.BOTTOM - 50});
        }
    }

    // Check if input empty
    const onChangeInput = (values: SignInForm) => {
        if (values.username === '' && values.password === '' && !isEmptyInput) setEmptyInput(true);
        else if (values.username !== '' && values.password !== '' && isEmptyInput) setEmptyInput(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <KeyboardAvoidingView 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.headerContainer}>
                    <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/>        
                </View>

                <Formik
                    initialValues={initialFormValue}
                    onSubmit={(values) => {validateForm(values);}}
                    validationSchema={validationSchema}
                    validate={(values) => onChangeInput(values)}
                >
                {({values, handleChange, errors, handleSubmit, handleBlur, setFieldTouched, handleReset}) =>
                    <React.Fragment>
                        <View style={styles.formContainer}>
                            <TextInputGroup 
                                label={I18n.translate('authentication.login.username')}
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={() => {handleBlur('username'); setFieldTouched('username')}}
                                placeholder={I18n.translate('authentication.login.username-placeholder')}
                            />

                            <TextInputGroup 
                                label={I18n.translate('authentication.login.password')}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => {handleBlur('password'); setFieldTouched('password')}}
                                placeholder={I18n.translate('authentication.login.password-placeholder')}
                                secureTextEntry={!isPasswordShown}
                                onToggleShowPassword={toggleShowPassword}
                            />

                            <View style={styles.signInButton}>
                                <Button 
                                    title={I18n.translate('authentication.login.signin')} 
                                    onClick={() => { renderToast(errors); handleSubmit() }} 
                                    disabled={isEmptyInput} 
                                />
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
                            <LinkButton title={I18n.translate('authentication.login.signup')} color={styleVars.white} onClick={() => {handleReset(); handleSignUp()}}/>
                            <LinkButton title={I18n.translate('authentication.login.forgot-password')} color={styleVars.white} onClick={ handleForgotPassword }/>
                        </View>
                    </React.Fragment>
                }
                </Formik>

                
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
