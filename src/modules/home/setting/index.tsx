import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import CustomModal from '../../../shared/components/modal';
import { styles } from './styles';
import { LOGOUT } from './../../../redux/modules/auth/actions';
import { connect } from 'react-redux';
import I18n from './../../../i18n';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import LanguageSvg from '../../../assets/icons/language.svg';
import LockSvg from '../../../assets/icons/lock.svg';
import LogoutSvg from '../../../assets/icons/logout.svg';
import EditProfileSvg from '../../../assets/icons/edit-profile.svg';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import { removeTokenFromLocalStorage } from './../../../shared/helper/authentication';
import { changeLanguage, getLanguage } from '../../../i18n/utils';
import { styleVars } from '../../../shared/constance/style-variables';
import { Button, LinkButton } from '../../../shared/components';
interface Props extends DispatchProps, StateProps {
    navigation: any,
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
    const name = 'Hoang Anh';
    const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [isModalRestartVisible, setModalRestartVisible] = useState(false);
    const languageList = [
        {label: I18n.translate('changeLanguage.english'), value: 0 },
        {label: I18n.translate('changeLanguage.vietnamese'), value: 1 }
    ];
    const [languageActive, setLanguageActive] = useState<string>();
    const [isLanguageChange, setIsLanguageChange] = useState<boolean>(false);
    useEffect(() => {
        const getLanguageActive = async() => {
            const active = await getLanguage();
            setLanguageActive(active);
        }
        getLanguageActive();
    }, [])
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
    };
    const toggleModalLanguage = () => {
        console.log(2)
        // Toggle modal
        setModalLanguageVisible(!isModalLanguageVisible);
        console.log(isModalLanguageVisible)
        setIsLanguageChange(false);
    }
    // const toggleModalLanguage = () => {
    //     setModalLanguageVisible(!isModalLanguageVisible);
    // };
    const toggleModalRestart = () => {
        setModalRestartVisible(!isModalRestartVisible);
    };
    const handleLogout = () => {
        removeTokenFromLocalStorage();
        props.logout();
    };
    const handleSignIn = () => {
        props.navigation.navigate('Login');
    };
    return (
        <>
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20}  />
                    </TouchableOpacity>
                    <View style={styles.header__right}>
                        <Text style={styles.title}>{I18n.translate('setting.title')}</Text>
                    </View>
                </View> */}
                <View style={styles.info}>
                    <View style={styles.info__left}>
                    {   
                        props.refresh_token !== null ? 
                            <>
                                <Image source={ require( '../../../assets/img/avatar.png') } style={styles.avatar}/>
                                <Text style={styles.name}>{name}</Text>
                            </> : 
                            <View style={styles.loginContainer}>
                                <Button 
                                    title={I18n.translate('setting.signin')}
                                    onClick={handleSignIn}
                                    size="big"
                                />
                            </View>
                    }
                    </View>
                </View>
                <View style={styles.main}>
                    {/* Edit Profile */}
                    {props.refresh_token !== null && 
                        <TouchableOpacity onPressOut={() => props.navigation.navigate('EditProfile')}>
                            <View style={styles.main__item}>
                                <View style={styles.main__left}>
                                    <View style={styles.main__left__svgView}>
                                        <EditProfileSvg width={22} height={22} />
                                    </View>
                                    <Text style={styles.main__item__text}>
                                        {I18n.translate('setting.editProfile')}
                                    </Text>
                                </View>
                                <ArrowSvg width={11} height={20}/>
                            </View>
                        </TouchableOpacity>
                    }
                    {/* Change Language */}
                    <TouchableOpacity onPressOut={toggleModalLanguage} >
                        <View style={styles.main__item} >
                            <View style={styles.main__left}>
                                <View style={styles.main__left__svgView}>
                                    <LanguageSvg width={22} height={22} />
                                </View>
                                <Text style={styles.main__item__text}>
                                    {I18n.translate('setting.change-language')}
                                </Text>
                            </View>
                            <ArrowSvg width={11} height={20}/>
                        </View>
                    </TouchableOpacity>
                    {/* Change Password */}
                    {props.refresh_token !== null && 
                        <TouchableOpacity onPressOut={() => props.navigation.navigate('ChangePassword')} >
                            <View style={styles.main__item}>
                                <View style={styles.main__left}>
                                    <View style={styles.main__left__svgView}>
                                        <LockSvg width={22} height={22} />
                                    </View>
                                    <Text style={styles.main__item__text}>
                                        {I18n.translate('setting.change-password')}
                                    </Text>
                                </View>
                                <ArrowSvg width={11} height={20}/>
                            </View>
                        </TouchableOpacity>
                    }
                    {/* Logout */}
                    {
                        props.refresh_token !== null && 
                            <>
                                <View style={styles.main__rule} />
                                <TouchableOpacity onPressOut={handleLogout}>
                                    <View style={[styles.main__item]}>
                                        <View style={styles.main__left__svgView}>
                                            <LogoutSvg width={22} height={22} />
                                        </View>
                                        <Text style={styles.main__item__text}>
                                            {I18n.translate('setting.logout')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                    }
                </View>
                {/* <ChangeLanguage /> */}
                <CustomModal 
                    isVisible={isModalLanguageVisible} 
                    title={I18n.translate('changeLanguage.title')}
                    onHide={toggleModalLanguage}
                >   
                    <RadioForm
                        radio_props={languageList}
                        initial={languageActive === 'en' ? 0 : 1}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={styleVars.white}
                        buttonSize={10}
                        buttonOuterSize={25}
                        selectedButtonColor={styleVars.secondaryColor}
                        animation={true}
                        labelStyle={styles.modal__language__label} 
                        onPress={(value) => {setIsLanguageChange(!isLanguageChange)}}
                    />
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
                {/* Modal Change Language */}
                {/* <View style={{ alignItems:'center', display: 'flex', justifyContent: 'space-between',}}>
                    
                    <Modal isVisible={isModalLanguageVisible} hasBackdrop={true}>
                        <View style={[styles.modal__language, {display: isModalRestartVisible ? 'none' : 'flex'}]}>
                            <TouchableOpacity >
                                <Text style={styles.modal__language__title}>
                                    {I18n.translate('changeLanguage.title')}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.modal__language__main}>
                                <RadioForm
                                    radio_props={languageList}
                                    initial={languageActive === 'en' ? 0 : 1}
                                    formHorizontal={false}
                                    labelHorizontal={true}
                                    buttonColor={styleVars.white}
                                    buttonSize={15}
                                    buttonOuterSize={30}
                                    selectedButtonColor={styleVars.secondaryColor}
                                    buttonWrapStyle={{ marginRight: 30, paddingBottom: 25}}
                                    animation={true}
                                    labelStyle={ styles.modal__language__label } 
                                    onPress={(value) => {setIsLanguageChange(!isLanguageChange)}}
                                />
                            </View>
                            <View style={styles.modal__language__footer}>
                                <TouchableOpacity 
                                    onPressOut={() => {
                                        toggleModalLanguage();
                                        setIsLanguageChange(false);
                                    }} 
                                    style={styles.modal__language__group}
                                >
                                    <Text style={styles.modal__language__footer__text}>{I18n.translate('changeLanguage.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPressOut={() => {
                                        toggleModalRestart();
                                    }} 
                                    disabled={!isLanguageChange}
                                    style={styles.modal__language__group}
                                >
                                    <Text style={[styles.modal__language__footer__text, {color : isLanguageChange ? styleVars.crimsonColor : styleVars.greyColor}]}>
                                        {I18n.translate('changeLanguage.save')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal> */}
                    {/* Modal Restart ? */}
                    <Modal isVisible={isModalRestartVisible} >
                        <View style={styles.modal__restart}>
                            <View >
                                <Text style={styles.modal__restart__title}>{I18n.translate('changeLanguage.restartApp')}</Text>
                            </View>
                            <View>
                                <Text style={styles.modal__restart__main__text}>{I18n.translate('changeLanguage.restartContent')}</Text>
                            </View>
                            <View style={styles.modal__restart__footer}>
                                <TouchableOpacity 
                                    onPressOut={() => {
                                        toggleModalRestart() ;
                                    }} 
                                    style={styles.modal__restart__group}
                                >
                                    <Text style={styles.modal__restart__footer__text}>{I18n.translate('changeLanguage.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPressOut={() => handleChangeLanguage(languageActive === 'en' ? 'vi' : 'en')} 
                                    style={styles.modal__restart__group}
                                >
                                    <Text style={styles.modal__restart__footer__text}>{I18n.translate('changeLanguage.restart')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
            </View>
        </>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>