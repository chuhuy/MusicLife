/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {GET_CURRENT_LANGUAGE} from './../../redux/modules/i18n/actions';
import {
  TOKEN_FROM_STORAGE,
  FETCH_CURRENT_USER,
} from './../../redux/modules/auth/actions';
import {getTokenFromLocalStorage} from './../../shared/helper/authentication';
import Logo from './../../assets/images/logo-vector.svg';
import AppName from './../../assets/images/app-name.svg';

interface Props extends DispatchProps {
  navigation: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCurrentLanguage: () => dispatch({type: GET_CURRENT_LANGUAGE}),
    setRefreshToken: (token: string) =>
      dispatch({type: TOKEN_FROM_STORAGE, payload: token}),
    fetchUser: (refresh_token: string) => dispatch({type: FETCH_CURRENT_USER, payload: {refresh_token}}),
  };
};

const SplashScreen: React.FunctionComponent<Props> = (props: Props) => {
  let refresh_token = null;
  useEffect(() => {
    props.getCurrentLanguage();
    refresh_token = getTokenFromLocalStorage();
    const timer = setTimeout(() => {
      refresh_token = refresh_token._W;
      if (refresh_token !== null) {
        props.setRefreshToken(refresh_token);
        props.fetchUser(refresh_token);
      }
      props.navigation.dispatch(StackActions.replace('TabNavigator'));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <AppName />
      </View>
    </>
  );
};

export default connect(null, mapDispatchToProps)(SplashScreen);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
