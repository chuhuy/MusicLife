/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LoginManager } from 'react-native-fbsdk';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { SignInForm } from '../../../models/form/signin';
import { notifyError } from '../../../shared/components/notify';
import I18n from './../../../i18n';
import { ErrorMessage } from './../../../models/error-message';
import { LoginUser } from './../../../models/LoginUser';
import { LOGIN } from './../../../redux/modules/auth/actions';
import { FacebookButton, GoogleButton, LinkButton } from './../../../shared/components';
import { Button } from './../../../shared/components/button';
import { styles } from './styles';
import EyeShowIcon from '../../../assets/icons/eye-show-password.svg';
import EyeyHideIcon from '../../../assets/icons/eye-hide-password.svg';
import { styleVars } from '../../../shared/constance/style-variables';

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
            .max(40, I18n.translate('authentication.login.err-failed-username'))
            .required(I18n.translate('authentication.login.err-failed-username')),

        password: Yup.string()
            .min(8, I18n.translate('authentication.login.err-failed-password'))
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, I18n.translate('authentication.login.err-failed-password'))
            .required(I18n.translate('authentication.login.err-failed-password')),
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
    const renderToast = errors => {
        if (errors.username !== '' && errors.password !== '')
            notifyError(I18n.translate('authentication.login.err-toast-msg'), {position: Toast.positions.BOTTOM - 50});
    }

    // Check if input empty
    const onChangeInput = (values: typeof initialFormValue) => {
        if (values.username === '' && values.password === '' && !isEmptyInput) setEmptyInput(true);
        else if (values.username !== '' && values.password !== '' && isEmptyInput) setEmptyInput(false);
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
                        validate={(values) => onChangeInput(values)}
                    >
                    {({values, handleChange, errors, handleSubmit, handleBlur, setFieldTouched}) =>
                        <React.Fragment>
                            <View style={styles.bodyContainer}>
                                <View style={styles.formContainer}>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.username')}</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            onBlur={() => {handleBlur('username'); setFieldTouched('username')}}
                                            placeholder={I18n.translate('authentication.login.username-placeholder')}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.textInputLabel}>{I18n.translate('authentication.login.password')}</Text>
                                        <View>
                                            <TextInput
                                                secureTextEntry={!isPasswordShown}
                                                style={styles.textInput}
                                                value={values.password}
                                                onChangeText={handleChange('password')}
                                                onBlur={() => {handleBlur('password'); setFieldTouched('password')}}
                                                placeholder={I18n.translate('authentication.login.password-placeholder')}
                                            />
                                            <View style={styles.textSecurity}>
                                                <TouchableWithoutFeedback onPress={toggleShowPassword}>
                                                    {
                                                        isPasswordShown ? 
                                                            <EyeShowIcon fill={styleVars.greyColor} width={25} height={25} /> :
                                                            <EyeyHideIcon fill={styleVars.greyColor} width={25} height={25} /> 
                                                    }
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.signInButton}>
                                        <Button 
                                            title={I18n.translate('authentication.login.signin')} 
                                            onClick={() => { renderToast(errors); handleSubmit()}} 
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
                                    <LinkButton title={I18n.translate('authentication.login.signup')} color={styleVars.white} onClick={() => handleSignUp()}/>
                                    <LinkButton title={I18n.translate('authentication.login.forgot-password')} color={styleVars.white} onClick={() => handleForgotPassword()}/>
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
