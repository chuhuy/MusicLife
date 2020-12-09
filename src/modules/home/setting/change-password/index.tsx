import React, {Fragment, useState} from 'react';
import {Formik} from 'formik';
import {Alert, View} from 'react-native';
import * as Yup from 'yup';
import I18n from '../../../../i18n';
import {BaseScreen, Button} from '../../../../shared/components';
import TextInputGroup from '../../../../shared/components/form/textInput';
import {styles} from './styles';
import {ChangePasswordForm} from '../../../../models/form/change-password';
import {connect} from 'react-redux';
import {changePassword} from './../../../../api/authentication';
import {useNavigation} from '@react-navigation/native';
import { Screen } from '../../../../shared/constance/screen';
interface Props extends StateProps {
  navigation: any;
}
const mapStateToProps = (state: any) => ({
  access_token: state.auth.access_token,
});
const ChangePassword: React.FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation();
  const {} = props;
  const [isPasswordShown, setPasswordShown] = useState<Array<boolean>>([
    false,
    false,
    false,
  ]);

  const initialValues: ChangePasswordForm = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  };

  const toggleShowPassword = (index) => {
    setPasswordShown((prevState) => {
      prevState[index] = !prevState[index];
      return [...prevState];
    });
  };
  const handleChangePassword = (values: ChangePasswordForm) => {
    changePassword(values.oldPassword, values.newPassword)
      .then((response) => {
        if (response.status) {
          navigation.navigate(Screen.Setting.Main);
        } else {
          Alert.alert(response.errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, I18n.translate('changePassword.password_minError'))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        I18n.translate('changePassword.matchError'),
      )
      .required(I18n.translate('changePassword.oldPassword_requireError'))
      .max(40),

    newPassword: Yup.string()
      .min(8, I18n.translate('changePassword.password_minError'))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        I18n.translate('changePassword.matchError'),
      )
      .required(I18n.translate('changePassword.newPassword_requireError')),

    reNewPassword: Yup.string()
      .required(I18n.translate('changePassword.repeatNewPassword_requireError'))
      .when('newPassword', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          I18n.translate('changePassword.repeatNewPassword_sameError'),
        ),
      }),
  });
  return (
    <>
      <BaseScreen isScroll={true}>
        <View style={styles.main}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleChangePassword(values)}
            validationSchema={validationSchema}>
            {({values, handleChange, errors, setFieldTouched, isValid}) => (
              <Fragment>
                <View>
                  <TextInputGroup
                    placeholder={I18n.translate(
                      'changePassword.oldPasswordPlaceHolder',
                    )}
                    label={I18n.translate('changePassword.oldPasswordLabel')}
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={() => setFieldTouched('oldPassword')}
                    secureTextEntry={!isPasswordShown[0]}
                    onToggleShowPassword={() => toggleShowPassword(0)}
                    error={errors.oldPassword}
                  />

                  <TextInputGroup
                    placeholder={I18n.translate(
                      'changePassword.newPasswordPlaceholder',
                    )}
                    label={I18n.translate('changePassword.newPasswordLabel')}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={() => setFieldTouched('newPassword')}
                    secureTextEntry={!isPasswordShown[1]}
                    onToggleShowPassword={() => toggleShowPassword(1)}
                    error={errors.newPassword}
                  />

                  <TextInputGroup
                    placeholder={I18n.translate(
                      'changePassword.repeatNewPasswordPlaceholder',
                    )}
                    label={I18n.translate(
                      'changePassword.repeatNewPasswordLabel',
                    )}
                    value={values.reNewPassword}
                    onChangeText={handleChange('reNewPassword')}
                    onBlur={() => setFieldTouched('reNewPassword')}
                    secureTextEntry={!isPasswordShown[2]}
                    onToggleShowPassword={() => toggleShowPassword(2)}
                    error={errors.reNewPassword}
                  />
                  <View style={styles.saveButtonContainer}>
                    <Button
                      title={I18n.translate('changePassword.save')}
                      onClick={() => handleChangePassword(values)}
                      disabled={!isValid}
                      size={'big'}
                    />
                  </View>
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
      </BaseScreen>
    </>
  );
};
export default connect(mapStateToProps, null)(ChangePassword);

type StateProps = ReturnType<typeof mapStateToProps>;
