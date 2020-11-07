/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { Screen } from '../../../shared/constance/screen';
import { styles } from './styles';
import I18n from '../../../i18n';
import { Messages } from '../../../shared/constance/messages';
import { notifyError } from '../../../shared/components/notify';
import Toast from 'react-native-root-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, FacebookButton, GoogleButton } from '../../../shared/components';
import TextInputGroup from '../../../shared/components/form/textInput';
import { SignUpForm } from '../../../models/form/signup';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import { styleVars } from '../../../shared/constance/style-variables';

interface Props {
    navigation: any
}

const Register: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation } = props;
    //  Password visibility
    const [isPasswordShown, setPasswordShown] = useState<Array<boolean>>([false, false]);
    // Empty input
    const [isEmptyInput, setEmptyInput] = useState<boolean>(true);
    console.log(isPasswordShown)
    // Form control
    const initialFormValue: SignUpForm = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
    // Validation
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .max(40, I18n.translate('authentication.register.error-length-username'))
            .matches(/^\w*[^\@]\w*$/, I18n.translate('authentication.register.error-regex-username'))
            .required('Sign up failed'),

        email: Yup.string()
            .max(40, I18n.translate('authentication.register.error-length-username'))
            .matches(/(^.+@[a-z0-9]+\.[a-z]{2,4})$/, I18n.translate('authentication.register.error-email'))
            .required('Sign up failed'),

        password: Yup.string()
            .min(8, I18n.translate('authentication.register.error-length-username'))
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, I18n.translate('authentication.register.error-password'))
            .required('Sign up failed'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('repeatPassword'), null], I18n.translate('authentication.register.error-repeat-password'))
            .required('Sign up failed'),
    })

    const validateForm = (values: SignUpForm) => {
        validationSchema.validate(values, {abortEarly: false})
        .then(() => {
            //  Validate successfully
            // handleSignIn(values);
        })
        .catch((errors) => {
            // setErrorMessageList((errors.inner.map((error: any, index: number) => {
            //     console.log(error);
            //     return {
            //         id: index,
            //         message: error.message,
            //     };
            // })));
        });
    };

    //  Toggle show password
    const toggleShowPassword = (index: number) => {
        setPasswordShown(prevState => {
            let newState = [...prevState];
            newState[index] = !prevState[index];
            return newState;
        });
    };

    // Check if input empty
    const onChangeInput = (values: SignUpForm) => {
        let valueEmpty = Object.keys(values).map(key => values[key] === ''),
            emptyIndex = valueEmpty.findIndex(ele => ele === true);
        console.log(valueEmpty)
        if (emptyIndex === -1 && !isEmptyInput){
            setEmptyInput(!isEmptyInput)
        } else if (emptyIndex !== -1 && isEmptyInput) setEmptyInput(!isEmptyInput)
    }

    // Signup
    const handleSignUp = () => {
    };

    const handleSignUpWithFacebook = async () => {
        
    };

    const handleSignUpWithGoogle = () => {
        console.log('Signed up with google');
    };

    // Navigate
    const handleSignIn = () => {
        for (let index of isPasswordShown){
            if (index){
                setPasswordShown([false, false]);
                break;
            }
        }
        
        navigation.navigate(Screen.Authentication.Login);
    };

    // Render Toast Error Message
    const renderToast = errors => {
        const keys = Object.keys(errors),
            totalErrors = keys.length;
        
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

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <KeyboardAvoidingView 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Formik
                    initialValues={initialFormValue}
                    onSubmit={(values) => validateForm(values)}
                    validationSchema={validationSchema}
                    validate={(values) => onChangeInput(values)}
                >
                {({values, handleChange, errors, handleSubmit, handleBlur, setFieldTouched, handleReset}) =>
                    <React.Fragment>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                onPressOut={() => { handleReset(); handleSignIn() }}
                                delayPressIn={0}
                            >
                                <ArrowBack width={15} height={26} />
                            </TouchableOpacity>
                            <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/>        
                        </View>
                        <View style={styles.formContainer}>
                            <TextInputGroup 
                                label={I18n.translate('authentication.register.username')}
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={() => {handleBlur('username'); setFieldTouched('username')}}
                                placeholder={I18n.translate('authentication.register.username-placeholder')}
                            />

                            <TextInputGroup 
                                label={I18n.translate('authentication.register.email')}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => {handleBlur('email'); setFieldTouched('email')}}
                                placeholder={I18n.translate('authentication.register.email-placeholder')}
                            />

                            <TextInputGroup 
                                label={I18n.translate('authentication.register.password')}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => {handleBlur('password'); setFieldTouched('password')}}
                                placeholder={I18n.translate('authentication.register.password-placeholder')}
                                secureTextEntry={!isPasswordShown[0]}
                                onToggleShowPassword={() => toggleShowPassword(0)}
                            />

                            <TextInputGroup 
                                label={I18n.translate('authentication.register.repeatPassword')}
                                value={values.repeatPassword}
                                onChangeText={handleChange('repeatPassword')}
                                onBlur={() => {handleBlur('repeatPassword'); setFieldTouched('repeatPassword')}}
                                placeholder={I18n.translate('authentication.register.repeatPassword-placeholder')}
                                secureTextEntry={!isPasswordShown[1]}
                                onToggleShowPassword={() => toggleShowPassword(1)}
                            />

                            <View style={styles.signUpButton}>
                                <Button 
                                    title={I18n.translate('authentication.register.signup')} 
                                    onClick={() => { renderToast(errors); handleSubmit() }} 
                                    disabled={isEmptyInput} 
                                />
                            </View>

                            <View style={styles.separator}>
                                <View style={styles.separatorLine}/>
                                <Text style={styles.separatorLabel}>{I18n.translate('authentication.register.or')}</Text>
                                <View style={styles.separatorLine}/>
                            </View>
                            
                            <View style={styles.buttonGroup}>
                                <FacebookButton onClick={handleSignUpWithFacebook} />
                                <GoogleButton onClick={handleSignUpWithGoogle}/>
                            </View>
                        </View>
                    </React.Fragment>
                }
                </Formik>

                {/* <View style={styles.linkButtonGroup}>
                    <LinkButton title={I18n.translate('authentication.register.signup')} color={styleVars.white} onClick={() => handleSignUp()}/>
                    <LinkButton title={I18n.translate('authentication.login.forgot-password')} color={styleVars.white} onClick={() => handleForgotPassword()}/>
                </View> */}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default Register;
