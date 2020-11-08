import React, { Fragment, useState } from 'react';
import { Alert, Text, View , TextInput} from 'react-native';
import {styles} from './styles';
import I18n from '../../../../i18n';
import ArrowBackSvg from '../../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup  from 'yup';
interface Props {
    navigation: any,
}
const ChangePassword: React.FunctionComponent<Props> = (props: Props) => {
    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
    const initialValues = {oldPassword: '', newPassword: '', re_newPassword: ''};
    const toggleShowPassword = () => {
        setPasswordShown(!isPasswordShown);
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20}/>
                    </TouchableOpacity>
                    <View style={styles.header__right}>
                        <Text style={styles.title}>{I18n.translate('setting.change-password')}</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleChangePassword(values)}
                        validationSchema={ validationSchema }
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => 
                            <Fragment>
                                <View>
                                    <View style={styles.form__group}>
                                        <Text style={styles.label}>{I18n.translate('changePassword.oldPassword')}</Text>
                                        <TextInput
                                            value={values.oldPassword}
                                            onChangeText={handleChange('oldPassword')}
                                            onBlur={() => setFieldTouched('oldPassword')}
                                            style={styles.input}
                                            secureTextEntry={!isPasswordShown}
                                        />
                                        {touched.oldPassword && errors.oldPassword &&
                                            <Text style={styles.error}>
                                                {errors.oldPassword}
                                            </Text>
                                        }
                                    </View>
                                    <View style={styles.form__group}>
                                        <Text style={styles.label}>{I18n.translate('changePassword.newPassword')}</Text>
                                        <TextInput
                                            value={values.newPassword}
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={() => setFieldTouched('newPassword')}
                                            style={styles.input}
                                            secureTextEntry={!isPasswordShown}
                                        />
                                        {touched.newPassword && errors.newPassword &&
                                            <Text style={styles.error}>
                                                {errors.newPassword}
                                            </Text>
                                        }
                                    </View>
                                    <View style={styles.form__group}>
                                        <Text style={styles.label}>{I18n.translate('changePassword.re_newPassword')}</Text>
                                        <TextInput
                                            value={values.re_newPassword}
                                            onChangeText={handleChange('re_newPassword')}
                                            onBlur={() => setFieldTouched('re_newPassword')}
                                            style={styles.input}
                                            secureTextEntry={!isPasswordShown}
                                        />
                                        {touched.re_newPassword && errors.re_newPassword &&
                                            <Text style={styles.error}>
                                                {errors.re_newPassword}
                                            </Text>
                                        }
                                    </View>
                                    <View style={{display: 'flex', alignItems: 'center'}}>
                                        <TouchableOpacity onPressOut={handleSubmit} disabled={!isValid} >
                                            <View style={styles.btn}>
                                                <Text style={styles.btn__title}>{I18n.translate('changePassword.save')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Fragment>
                        }
                    </Formik>
                </View>
            </View>
        </>
    )
}
export default ChangePassword;