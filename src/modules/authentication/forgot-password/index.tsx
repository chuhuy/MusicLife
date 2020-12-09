import React, {Fragment} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {styles} from './styles';
import Header from '../components/header';
import {Formik} from 'formik';
import TextInputGroup from '../../../shared/components/form/textInput';
import I18n from '../../../i18n';
import * as Yup from 'yup';
import {Button} from '../../../shared/components';
import {Screen} from '../../../shared/constance/screen';
import {ForgotPasswordForm} from '../../../models/form/forgot-pasword';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  navigation: any;
}

const ForgotPassword: React.FunctionComponent<Props> = (props: Props) => {
  const {navigation} = props;
  const initialValues: ForgotPasswordForm = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(
        I18n.translate('authentication.reset-password.error-required-email'),
      )
      .email(I18n.translate('authentication.reset-password.error-email')),
  });
  const handleSignIn = () => {
    navigation.navigate(Screen.Authentication.Login);
  };
  const handleSubmit = (value: ForgotPasswordForm) => {
    console.log(value);
  };
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.scrollView}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({
                errors,
                isValid,
                values,
                handleReset,
                handleChange,
                handleBlur,
                setFieldTouched,
              }) => (
                <Fragment>
                  <Header
                    goBack={() => {
                      handleReset();
                      handleSignIn();
                    }}
                  />
                  <View style={styles.inputGroup}>
                    <TextInputGroup
                      onBlur={() => {
                        handleBlur('email');
                        setFieldTouched('email');
                      }}
                      label={'Email'}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      error={errors.email}
                      placeholder={I18n.translate(
                        'authentication.reset-password.email-placeholder',
                      )}
                    />
                  </View>
                  <View>
                    <Button
                      title={I18n.translate(
                        'authentication.reset-password.confirm-email',
                      )}
                      onClick={() => handleSubmit(values)}
                      disabled={!isValid}
                    />
                  </View>
                </Fragment>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ForgotPassword;
