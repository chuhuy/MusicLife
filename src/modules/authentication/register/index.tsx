/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Screen} from '../../../shared/constance/screen';
import {styles} from './styles';
import I18n from '../../../i18n';
import {Messages} from '../../../shared/constance/messages';
import {notifyError} from '../../../shared/components/notify';
import Toast from 'react-native-root-toast';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../../../shared/components';
import TextInputGroup from '../../../shared/components/form/textInput';
import {SignUpForm} from '../../../models/form/signup';
import {SafeAreaView} from 'react-native';
import Header from '../components/header';
import {register} from './../../../api/authentication';

interface Props {
  navigation: any;
}

const Register: React.FunctionComponent<Props> = (props: Props) => {
  const {navigation} = props;
  //  Password visibility
  const [isPasswordShown, setPasswordShown] = useState<Array<boolean>>([
    false,
    false,
  ]);
  // Empty input
  const [isEmptyInput, setEmptyInput] = useState<boolean>(true);

  // Ref for input
  const inputs = [];

  // Focus next input
  const onSubmitEditing = (index) => {
    if (index < inputs.length - 1) {
      console.log(inputs[index]);
      inputs[index + 1].focus();
    }
  };

  // Form control
  const initialFormValue: SignUpForm = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    displayName: '',
  };
  // Validation
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(40, I18n.translate('authentication.register.error-length-username'))
      .matches(
        /^[a-z0-9]+$/i,
        I18n.translate('authentication.register.error-regex-username'),
      )
      .required(
        I18n.translate('authentication.register.error-required-username'),
      ),

    email: Yup.string()
      .max(40, I18n.translate('authentication.register.error-length-username'))
      .matches(
        /(^.+@[a-z0-9]+\.[a-z]{2,4})$/,
        I18n.translate('authentication.register.error-email'),
      )
      .required(I18n.translate('authentication.register.error-required-email')),

    password: Yup.string()
      .min(8, I18n.translate('authentication.register.error-length-password'))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        I18n.translate('authentication.register.error-password'),
      )
      .required(
        I18n.translate('authentication.register.error-required-password'),
      ),

    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref('repeatPassword'), null],
        I18n.translate('authentication.register.error-repeat-password'),
      )
      .required(
        I18n.translate(
          'authentication.register.error-required-repeat-password',
        ),
      ),
  });

  const validateForm = (values: SignUpForm) => {
    validationSchema
      .validate(values, {abortEarly: false})
      .then(() => {
        //  Validate successfully
        handleSignUp(values);
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
    setPasswordShown((prevState) => {
      let newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  // Check if input empty
  const onChangeInput = (values: SignUpForm) => {
    let valueEmpty = Object.keys(values).map((key) => values[key] === ''),
      emptyIndex = valueEmpty.findIndex((ele) => ele === true);

    if (emptyIndex === -1 && isEmptyInput) {
      setEmptyInput(!isEmptyInput);
    } else if (emptyIndex !== -1 && !isEmptyInput) {setEmptyInput(!isEmptyInput);}
  };

  // Signup
  const handleSignUp = (values: SignUpForm) => {
      console.log(values);
      register(values.username, values.password, values.displayName, values.email)
      .then((response) => {
        console.log(response);
        if (response.status) {
            navigation.navigate(Screen.Authentication.Login);
        } else {
            renderToast(response.errorMessage);
        }
      })
      .catch((error) => {
          console.log(error);
      });
  };

  // Navigate
  const handleSignIn = () => {
    for (let index of isPasswordShown) {
      if (index) {
        setPasswordShown([false, false]);
        break;
      }
    }

    navigation.navigate(Screen.Authentication.Login);
  };

  // Render Toast Error Message
  const renderToast = (error) => {
    switch (error) {
      case Messages.Auth.IncorrectPassword:
        error = I18n.translate('authentication.login.incorrect-password');
        break;
      case Messages.Auth.AccountNotExist:
        error = I18n.translate('authentication.login.account-not-exist');
        break;
      default:
        error = I18n.translate('authentication.register.fail-to-register');
    }

    notifyError(error, {position: Toast.positions.CENTER});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={{flex: 1}}>
          <Formik
            initialValues={initialFormValue}
            onSubmit={(values) => validateForm(values)}
            validationSchema={validationSchema}
            validate={(values) => onChangeInput(values)}>
            {({
              values,
              handleChange,
              errors,
              handleSubmit,
              handleBlur,
              setFieldTouched,
              handleReset,
            }) => (
              <React.Fragment>
                <Header
                  goBack={() => {
                    handleReset();
                    handleSignIn();
                  }}
                />
                <View style={styles.formContainer}>
                  <TextInputGroup
                    inputRef={(ref) => {
                      inputs[0] = ref;
                    }}
                    label={I18n.translate('authentication.register.username')}
                    value={values.username}
                    error={errors.username}
                    returnKeyType={'next'}
                    onChangeText={handleChange('username')}
                    onBlur={() => {
                      handleBlur('username');
                      setFieldTouched('username');
                    }}
                    placeholder={I18n.translate(
                      'authentication.register.username-placeholder',
                    )}
                    onSubmitEditing={() => onSubmitEditing(0)}
                  />

                  <TextInputGroup
                    inputRef={(ref) => {
                      inputs[4] = ref;
                    }}
                    label={I18n.translate('authentication.register.display-name')}
                    value={values.displayName}
                    error={errors.displayName}
                    returnKeyType={'next'}
                    onChangeText={handleChange('displayName')}
                    onBlur={() => {
                      handleBlur('displayName');
                      setFieldTouched('displayName');
                    }}
                    placeholder={I18n.translate(
                      'authentication.register.display-name-placeholder',
                    )}
                    onSubmitEditing={() => onSubmitEditing(0)}
                  />

                  <TextInputGroup
                    inputRef={(ref) => {
                      inputs[1] = ref;
                    }}
                    label={I18n.translate('authentication.register.email')}
                    value={values.email}
                    error={errors.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onChangeText={handleChange('email')}
                    onBlur={() => {
                      handleBlur('email');
                      setFieldTouched('email');
                    }}
                    placeholder={I18n.translate(
                      'authentication.register.email-placeholder',
                    )}
                    onSubmitEditing={() => onSubmitEditing(1)}
                  />

                  <TextInputGroup
                    inputRef={(ref) => {
                      inputs[2] = ref;
                    }}
                    label={I18n.translate('authentication.register.password')}
                    value={values.password}
                    returnKeyType={'next'}
                    onChangeText={handleChange('password')}
                    onBlur={() => {
                      handleBlur('password');
                      setFieldTouched('password');
                    }}
                    placeholder={I18n.translate(
                      'authentication.register.password-placeholder',
                    )}
                    secureTextEntry={!isPasswordShown[0]}
                    onToggleShowPassword={() => toggleShowPassword(0)}
                    onSubmitEditing={() => onSubmitEditing(2)}
                  />

                  <TextInputGroup
                    inputRef={(ref) => {
                      inputs[3] = ref;
                    }}
                    label={I18n.translate(
                      'authentication.register.repeatPassword',
                    )}
                    value={values.repeatPassword}
                    onChangeText={handleChange('repeatPassword')}
                    onBlur={() => {
                      handleBlur('repeatPassword');
                      setFieldTouched('repeatPassword');
                    }}
                    placeholder={I18n.translate(
                      'authentication.register.repeatPassword-placeholder',
                    )}
                    secureTextEntry={!isPasswordShown[1]}
                    onToggleShowPassword={() => toggleShowPassword(1)}
                  />

                  <View style={{marginTop: 20}}>
                    <Button
                      title={I18n.translate('authentication.register.signup')}
                      onClick={() => handleSubmit()}
                      disabled={isEmptyInput}
                    />
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
