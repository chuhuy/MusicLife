import { Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { Alert, View } from 'react-native';
import * as Yup from 'yup';
import I18n from '../../../../i18n';
import { BaseScreen, Button } from '../../../../shared/components';
import TextInputGroup from '../../../../shared/components/form/textInput';
import { styles } from './styles';
interface Props {
    navigation: any,
}
const ChangePassword: React.FunctionComponent<Props> = (props: Props) => {
    const [isPasswordShown, setPasswordShown] = useState<Array<boolean>>([false, false, false]);

    const initialValues = {
        oldPassword: '', 
        newPassword: '', 
        reNewPassword: ''
    };

    const toggleShowPassword = (index) => {
        setPasswordShown(prevState => {
            prevState[index] = !prevState[index];
            return [...prevState];
        });
    };
    const handleChangePassword = (values) => {
        console.log(values)
        Alert.alert('handle submit');
    }
    const validationSchema = Yup.object().shape({
        oldPassword :   Yup.string()
            .min(8, I18n.translate('changePassword.errOldPassword_least'))
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, I18n.translate('changePassword.match'))
            .required(I18n.translate('changePassword.errOldPassword_require')),

        newPassword :   Yup.string()
            .min(8, I18n.translate('changePassword.errNewPassword_least'))
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, I18n.translate('changePassword.match'))
            .required(I18n.translate('changePassword.errNewPassword_require')),

        re_newPassword: Yup.string()
            .required(I18n.translate('changePassword.errRe_newPassword_require'))
            .when("newPassword", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("newPassword")],
                    I18n.translate('changePassword.errRe_newPassword')
                )
            })
    })
    return (
        <>
            <BaseScreen isScroll={true}>
                <View style={styles.main}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleChangePassword(values)}
                        validationSchema={ validationSchema }
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => 
                            <Fragment>
                                <View>
                                    <TextInputGroup
                                        placeholder={I18n.translate('changePassword.placeholderOldPassword')}
                                        label={I18n.translate('changePassword.oldPassword')}
                                        value={values.oldPassword}
                                        onChangeText={handleChange('oldPassword')}
                                        onBlur={() => setFieldTouched('oldPassword')}
                                        secureTextEntry={!isPasswordShown[0]}
                                        onToggleShowPassword={() => toggleShowPassword(0)}
                                    />

                                    <TextInputGroup 
                                        placeholder={I18n.translate('changePassword.placeholderNewPassword')}
                                        label={I18n.translate('changePassword.newPassword')}
                                        value={values.newPassword}
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={() => setFieldTouched('newPassword')}
                                        secureTextEntry={!isPasswordShown[1]}
                                        onToggleShowPassword={() => toggleShowPassword(1)}
                                    />

                                    <TextInputGroup 
                                        label={I18n.translate('changePassword.newPassword')}
                                        value={values.reNewPassword}
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={() => setFieldTouched('newPassword')}
                                        secureTextEntry={!isPasswordShown[2]}
                                        onToggleShowPassword={() => toggleShowPassword(2)}
                                    />
                                    <View style={styles.saveButtonContainer}>
                                        <Button 
                                            title={I18n.translate('changePassword.save')}
                                            onClick={handleSubmit}
                                            disabled={!isValid}
                                            size='big'
                                        />
                                    </View>
                                </View>
                            </Fragment>
                        }
                    </Formik>
                </View>
            </BaseScreen>
        </>
    )
}
export default ChangePassword;
