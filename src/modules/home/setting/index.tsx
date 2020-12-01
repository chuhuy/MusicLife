import React, {useState, useEffect} from 'react';
import {Text, View, Image, Pressable, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import CustomModal from '../../../shared/components/modal';
import {styles} from './styles';
import {LOGOUT} from './../../../redux/modules/auth/actions';
import {connect} from 'react-redux';
import I18n from './../../../i18n';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import LanguageSvg from '../../../assets/icons/language.svg';
import LockSvg from '../../../assets/icons/lock.svg';
import LogoutSvg from '../../../assets/icons/logout.svg';
import EditProfileSvg from '../../../assets/icons/edit-profile.svg';
import {removeTokenFromLocalStorage} from './../../../shared/helper/authentication';
import {changeLanguage, getLanguage} from '../../../i18n/utils';
import {styleVars} from '../../../shared/constance/style-variables';
import {Button, LinkButton} from '../../../shared/components';
import {Screen} from '../../../shared/constance/screen';
import RadioButton from './../../../shared/components/radio-button';
interface Props extends DispatchProps, StateProps {
    navigation: any;
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch({type: LOGOUT}),
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});
const Setting: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, refresh_token, logout} = props;
    const name = 'Hoang Anh';
    const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [isModalRestartVisible, setModalRestartVisible] = useState(false);
    const [languageActive, setLanguageActive] = useState<string>();
    useEffect(() => {
        const getLanguageActive = async () => {
            const active = await getLanguage();
            setLanguageActive(active);
        };
        getLanguageActive();
    }, []);
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
    };
    const toggleModalLanguage = () => {
        setModalLanguageVisible(!isModalLanguageVisible);
    };
    const toggleModalRestart = () => {
        setModalRestartVisible(!isModalRestartVisible);
    };

    const handleEditProfile = () => {
        navigation.navigate(Screen.Setting.EditProfile);
    };

    const handleChangePassword = () => {
        navigation.navigate(Screen.Setting.ChangePassword);
    };

    const handleLogout = () => {
        removeTokenFromLocalStorage();
        logout();
    };

    const handleSignIn = () => {
        navigation.navigate(Screen.Authentication.Login);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.info}>
                    <View style={styles.info__left}>
                        {refresh_token !== null ? (
                            <>
                                <Image
                                    source={require('../../../assets/img/avatar.png')}
                                    style={styles.avatar}
                                />
                                <Text style={styles.name}>{name}</Text>
                            </>
                        ) : (
                            <View style={styles.loginContainer}>
                                <Button
                                    title={I18n.translate('setting.signin')}
                                    onClick={handleSignIn}
                                    size="big"
                                />
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.main}>
                    {/* Edit Profile */}
                    {refresh_token !== null && (
                        <Pressable onPressOut={handleEditProfile}>
                            <View style={styles.main__item}>
                                <View style={styles.main__left}>
                                    <View style={styles.main__left__svgView}>
                                        <EditProfileSvg
                                            width={22}
                                            height={22}
                                        />
                                    </View>
                                    <Text style={styles.main__item__text}>
                                        {I18n.translate('setting.editProfile')}
                                    </Text>
                                </View>
                                <ArrowSvg width={11} height={20} />
                            </View>
                        </Pressable>
                    )}
                    {/* Change Language */}
                    <Pressable onPressOut={toggleModalLanguage}>
                        <View style={styles.main__item}>
                            <View style={styles.main__left}>
                                <View style={styles.main__left__svgView}>
                                    <LanguageSvg width={22} height={22} />
                                </View>
                                <Text style={styles.main__item__text}>
                                    {I18n.translate('setting.change-language')}
                                </Text>
                            </View>
                            <ArrowSvg width={11} height={20} />
                        </View>
                    </Pressable>
                    {/* Change Password */}
                    {refresh_token !== null && (
                        <Pressable onPressOut={handleChangePassword}>
                            <View style={styles.main__item}>
                                <View style={styles.main__left}>
                                    <View style={styles.main__left__svgView}>
                                        <LockSvg width={22} height={22} />
                                    </View>
                                    <Text style={styles.main__item__text}>
                                        {I18n.translate(
                                            'setting.change-password',
                                        )}
                                    </Text>
                                </View>
                                <ArrowSvg width={11} height={20} />
                            </View>
                        </Pressable>
                    )}
                    {/* Logout */}
                    {refresh_token !== null && (
                        <>
                            <View style={styles.main__rule} />
                            <Pressable onPressOut={handleLogout}>
                                <View style={[styles.main__item]}>
                                    <View style={styles.main__left__svgView}>
                                        <LogoutSvg width={22} height={22} />
                                    </View>
                                    <Text style={styles.main__item__text}>
                                        {I18n.translate('setting.logout')}
                                    </Text>
                                </View>
                            </Pressable>
                        </>
                    )}
                </View>
                {/* <ChangeLanguage /> */}
                <CustomModal
                    isVisible={isModalLanguageVisible}
                    title={I18n.translate('changeLanguage.title')}
                    onHide={toggleModalLanguage}>
                    <View style={{marginTop: 5}}>
                        <TouchableOpacity
                            style={styles.modal__group}
                            onPressOut={() => setLanguageActive('vi')}>
                            <RadioButton
                                selected={languageActive === 'vi'}
                                inputStyle={{
                                    backgroundColor: styleVars.crimsonColor,
                                }}
                                borderStyleActive={{
                                    borderColor: styleVars.crimsonColor,
                                }}
                                borderStyle={{}}
                            />
                            <Text style={styles.modal__language__label}>
                                {I18n.translate('changeLanguage.vietnamese')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modal__group}
                            onPress={() => setLanguageActive('en')}>
                            <RadioButton
                                selected={languageActive === 'en'}
                                inputStyle={{
                                    backgroundColor: styleVars.crimsonColor,
                                }}
                                borderStyleActive={{
                                    borderColor: styleVars.crimsonColor,
                                }}
                                borderStyle={{}}
                            />
                            <Text style={styles.modal__language__label}>
                                {I18n.translate('changeLanguage.english')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal__language__footer}>
                        <LinkButton
                            title={I18n.translate('changeLanguage.cancel')}
                            onClick={toggleModalLanguage}
                            color={styleVars.greyColor}
                        />
                        <LinkButton
                            title={I18n.translate('changeLanguage.save')}
                            onClick={toggleModalRestart}
                            color={styleVars.secondaryColor}
                        />
                    </View>
                </CustomModal>

                {/* Modal Restart ? */}
                <Modal isVisible={isModalRestartVisible}>
                    <View style={styles.modal__restart}>
                        <View>
                            <Text style={styles.modal__restart__title}>
                                {I18n.translate('changeLanguage.restartApp')}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.modal__restart__main__text}>
                                {I18n.translate(
                                    'changeLanguage.restartContent',
                                )}
                            </Text>
                        </View>
                        <View style={styles.modal__restart__footer}>
                            <Pressable
                                onPressOut={() => {
                                    toggleModalRestart();
                                }}
                                style={styles.modal__restart__group}>
                                <Text
                                    style={styles.modal__restart__footer__text}>
                                    {I18n.translate('changeLanguage.cancel')}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPressOut={() =>
                                    handleChangeLanguage(
                                        languageActive
                                    )
                                }
                                style={styles.modal__restart__group}>
                                <Text
                                    style={styles.modal__restart__footer__text}>
                                    {I18n.translate('changeLanguage.restart')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
