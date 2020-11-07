import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { LOGOUT } from './../../../redux/modules/auth/actions';
import { connect } from 'react-redux';
import I18n from './../../../i18n';
import EditSvg from '../../../assets/icons/edit.svg';
import NotificationSvg from '../../../assets/icons/notifications.svg';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import LanguageSvg from '../../../assets/icons/language.svg';
import LockSvg from '../../../assets/icons/lock.svg';
import LogoutSvg from '../../../assets/icons/logout.svg';
import { removeTokenFromLocalStorage } from './../../../shared/helper/authentication';

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
                <View style={styles.header}>
                    <View style={styles.header__left}>
                        <Image source={ require( '../../../assets/img/avatar.png') } style={styles.avatar}/>
                        <Text style={styles.title}>Hoang Anh</Text>
                    </View>
                    {props.refresh_token !== null && <TouchableOpacity onPressOut={() => props.navigation.navigate('EditProfile')}>
                        <EditSvg width={27} height={27} style={styles.edit__icon}/>
                    </TouchableOpacity>}
                </View>

                <View style={styles.main}>
                    {/* Thong bao */}
                    <TouchableOpacity onPressOut={() => props.navigation.navigate('Notification')}>
                        <View style={styles.main__item}>
                            <View style={styles.main__left}>
                                <View style={styles.main__left__svgView}>
                                    <NotificationSvg width={20} height={21} />
                                </View>
                                <Text style={styles.main__item__text}>{I18n.translate('setting.notification')}</Text>
                            </View>
                            <ArrowSvg width={10} height={19}/>
                        </View>
                    </TouchableOpacity>

                    {/* Ngon Ngu */}
                    <TouchableOpacity onPressOut={() => props.navigation.navigate('ChangeLanguage')}>
                        <View style={styles.main__item} >
                            <View style={styles.main__left}>
                                <View style={styles.main__left__svgView}>
                                    <LanguageSvg width={20} height={21} />
                                </View>
                                <Text style={styles.main__item__text}>{I18n.translate('setting.language')}</Text>
                            </View>
                            <ArrowSvg width={10} height={19}/>
                        </View>
                    </TouchableOpacity>

                    {/* Mat Khau */}
                    <TouchableOpacity onPressOut={() => props.navigation.navigate('ChangePassword')}>
                        <View style={styles.main__item}>
                            <View style={styles.main__left}>
                                <View style={styles.main__left__svgView}>
                                    <LockSvg width={16} height={21} />
                                </View>
                                <Text style={styles.main__item__text}>{I18n.translate('setting.password')}</Text>
                            </View>
                            <ArrowSvg width={10} height={19}/>
                        </View>
                    </TouchableOpacity>

                    {/* hr */}
                    <View style={styles.main__rule} />

                    {/* Dang xuat */}
                    <TouchableOpacity onPressOut={props.refresh_token === null ? handleSignIn : handleLogout}>
                        <View style={[styles.main__item, styles.main__out]}>
                            <View style={styles.main__left__svgView}>
                                <LogoutSvg width={18} height={21} />
                            </View>
                            <Text style={styles.main__item__text}>{props.refresh_token === null ? I18n.translate('setting.signin') : I18n.translate('setting.logout')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* <View>
                    <Text>{I18n.translate('setting.title')}</Text>
                    <Button title="Vietnamese" onClick={() => handleChangeLanguage('vi')} />
                    <Button title="English" onClick={() => handleChangeLanguage('en')} />
                    <Button title="Logout" onClick={handleLogout} />
                </View> */}
            </View>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>
