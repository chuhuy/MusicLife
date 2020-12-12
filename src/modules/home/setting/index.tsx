/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, Image} from 'react-native';
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
import RadioButton from '../../../shared/components/radio-button';
import DefaultAvatar from './components/default-avatar';
import { useNetInfo } from '@react-native-community/netinfo';
interface Props extends DispatchProps, StateProps {
  navigation: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch({type: LOGOUT}),
  };
};

const mapStateToProps = (state: any) => ({
  access_token: state.auth.access_token,
  display_name: state.auth.display_name,
  default_avatar: state.auth.default_avatar,
  image_url: state.auth.image_url,
});

const Setting: React.FunctionComponent<Props> = (props: Props) => {
  let netInfo = useNetInfo();
  let { isConnected } = netInfo;
  const {navigation, access_token, logout} = props;
  const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
  const [isModalRestartVisible, setModalRestartVisible] = useState(false);
  const [languageActive, setLanguageActive] = useState<string>();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  useEffect(() => {
    const getLanguageActive = async () => {
      const active = await getLanguage();
      setLanguageActive(active);
      setCurrentLanguage(active);
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
    setModalRestartVisible(
      !isModalRestartVisible && currentLanguage !== languageActive,
    );
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
        {isConnected ? (
          <View style={styles.info}>
            <View style={styles.info__left}>
              {access_token ? (
                <>
                  {
                      props.image_url === null ?
                      (<>
                          <DefaultAvatar size={85} type={props.default_avatar} />
                      </>)
                      : (<>
                          <Image
                              source={{uri: props.image_url}}
                              style={styles.avatar}
                          />
                      </>)
                  }
                  <Text style={styles.name}>{props.display_name}</Text>
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
        ) : null}

        <View style={styles.main}>
          {/* Edit Profile */}
          {access_token && isConnected ? (
            <Pressable onPress={handleEditProfile}>
              <View style={styles.main__item}>
                <View style={styles.main__left}>
                  <View style={styles.main__left__svgView}>
                    <EditProfileSvg width={22} height={22} />
                  </View>
                  <Text style={styles.main__item__text}>
                    {I18n.translate('setting.editProfile')}
                  </Text>
                </View>
                <ArrowSvg width={11} height={20} />
              </View>
            </Pressable>
          ) : null}
          {/* Change Language */}
          <Pressable onPress={toggleModalLanguage}>
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
          {access_token && isConnected ? (
            <Pressable onPress={handleChangePassword}>
              <View style={styles.main__item}>
                <View style={styles.main__left}>
                  <View style={styles.main__left__svgView}>
                    <LockSvg width={22} height={22} />
                  </View>
                  <Text style={styles.main__item__text}>
                    {I18n.translate('setting.change-password')}
                  </Text>
                </View>
                <ArrowSvg width={11} height={20} />
              </View>
            </Pressable>
          ) : null}
          {/* Logout */}
          {access_token && (
            <>
              <View style={styles.main__rule} />
              <Pressable onPress={handleLogout}>
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
          <View style={{marginTop: 5, marginBottom: -15}}>
            <Pressable
              style={styles.modal__group}
              onPress={() => setLanguageActive('vi')}>
              <RadioButton
                selected={languageActive === 'vi'}
                inputStyle={{
                  backgroundColor: styleVars.secondaryColor,
                }}
                borderStyleActive={{
                  borderColor: styleVars.secondaryColor,
                }}
              />
              <Text style={styles.modal__language__label}>
                {I18n.translate('changeLanguage.vietnamese')}
              </Text>
            </Pressable>

            <Pressable
              style={styles.modal__group}
              onPress={() => setLanguageActive('en')}>
              <RadioButton
                selected={languageActive === 'en'}
                inputStyle={{
                  backgroundColor: styleVars.secondaryColor,
                }}
                borderStyleActive={{
                  borderColor: styleVars.secondaryColor,
                }}
              />
              <Text style={styles.modal__language__label}>
                {I18n.translate('changeLanguage.english')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.modal__footer}>
              <View style={styles.touchArea}>
                <LinkButton
                  title={I18n.translate('changeLanguage.cancel')}
                  onClick={() => {
                    toggleModalLanguage();
                    setLanguageActive(currentLanguage);
                  }}
                  color={styleVars.greyColor}
                  position
                />
              </View>

              <View style={{
                height: '50%',
                width: 1,
                backgroundColor: styleVars.greyColor,
              }}/>

              <View style={styles.touchArea}>
                <LinkButton
                  title={I18n.translate('changeLanguage.save')}
                  onClick={() => {
                    toggleModalLanguage();
                    toggleModalRestart();
                  }}
                  color={styleVars.secondaryColor}
                  position
                />
              </View>
          </View>
        </CustomModal>

        {/* Modal Restart ? */}
        <CustomModal
          isVisible={isModalRestartVisible}
          title={I18n.translate('changeLanguage.restartApp')}
          onHide={toggleModalRestart}>
          <View style={{marginTop: 5}}>
            <Text style={styles.modal__restart__main__text}>
              {I18n.translate('changeLanguage.restartContent')}
            </Text>
          </View>
          <View style={styles.modal__footer}>
            <View style={styles.touchArea}>
              <LinkButton
                title={I18n.translate('changeLanguage.cancel')}
                onClick={toggleModalRestart}
                color={styleVars.greyColor}
                position
              />
            </View>

            <View style={{
              height: '50%',
              width: 1,
              backgroundColor: styleVars.greyColor,
            }}/>

            <View style={styles.touchArea}>
              <LinkButton
                title={I18n.translate('changeLanguage.save')}
                onClick={() => handleChangeLanguage(languageActive)}
                color={styleVars.secondaryColor}
                position
              />
            </View>
          </View>
        </CustomModal>
      </View>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
