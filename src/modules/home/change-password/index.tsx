import React, { Fragment, useState } from 'react';
import { Alert, Text, View , TextInput, Button} from 'react-native';
import {styles} from './styles';
import I18n from '../../../i18n';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup  from 'yup';

interface Props {
    navigation: any,
}

const ChangePassword: React.FunctionComponent<Props> = (props: Props) => {
    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setPasswordShown(!isPasswordShown);
    };

    const handleForgotPassword = () => {
        props.navigation.negative('ForgotPassword');
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{I18n.translate('setting.password')}</Text>
                </View>
                <View style={styles.main}>
                    <Formik
                        initialValues={{oldPassword: '', newPassword: '', re_newPassword: ''}}
                        onSubmit={value => Alert.alert(value.toString())}
                        validationSchema={
                            Yup.object().shape({
                                oldPassword : Yup.string().
                                                min(6, I18n.translate('changePassword.errOldPassword_least')).
                                                required(I18n.translate('changePassword.errOldPassword_require')),
                                newPassword : Yup.string().
                                                min(6, I18n.translate('changePassword.errNewPassword_least')).
                                                required(I18n.translate('changePassword.errNewPassword_require')),
                                re_newPassword : Yup.string().
                                                min(6, I18n.translate('changePassword.errRe_newPassword_least')).
                                                required(I18n.translate('changePassword.errRe_newPassword_require')),
                            })
                        }
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => 
                            <Fragment>
                                <View style={styles.form__group}>
                                    <Text style={styles.label}>{I18n.translate('changePassword.oldPassword')}</Text>
                                    <TextInput
                                        value={values.oldPassword}
                                        onChangeText={handleChange('oldPassword')}
                                        onBlur={() => setFieldTouched('oldPassword')}
                                        placeholder={I18n.translate('changePassword.phdOldPassword')}
                                        placeholderTextColor={'#737373'}
                                        style={styles.input}
                                        secureTextEntry={!isPasswordShown}
                                    />
                                    {touched.oldPassword && errors.oldPassword &&
                                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>
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
                                        placeholder={I18n.translate('changePassword.phdNewPassword')}
                                        placeholderTextColor={'#737373'}
                                        style={styles.input}
                                        secureTextEntry={!isPasswordShown}
                                    />
                                    {touched.newPassword && errors.newPassword &&
                                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>
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
                                        placeholder={I18n.translate('changePassword.phdreNewPassword')}
                                        placeholderTextColor={'#737373'}
                                        style={styles.input}
                                        secureTextEntry={!isPasswordShown}
                                    />
                                    {touched.re_newPassword && errors.re_newPassword &&
                                        <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>
                                            {errors.re_newPassword}
                                        </Text>
                                    }
                                </View>
                                <TouchableOpacity style={{marginTop: 10}}>
                                    <Button
                                        title={I18n.translate('changePassword.confirm')}
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        style={styles.button}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginTop: 10,}}>
                                    <Button 
                                        title={I18n.translate('changePassword.forgotPassword')}
                                        onPress={() => handleForgotPassword()}
                                        style={styles.button}
                                    />
                                </TouchableOpacity>
                            </Fragment>
                        }
                    </Formik>
                </View>
            </View>
        </>
    )
}
export default ChangePassword;