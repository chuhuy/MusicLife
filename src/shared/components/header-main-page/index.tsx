/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {styles} from './styles';
import UserIcon from './../../../assets/icons/user.svg';
import NotificationIcon from './../../../assets/icons/notification-active.svg';
import {
  fetchAllNotification,
  insertNotification,
} from '../../../shared/helper/sqlite';
import {Screen} from '../../constance/screen';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../search-bar';
import {IconButton} from '../icon-button';
import {connect} from 'react-redux';
import DefaultAvatar from '../../../modules/home/setting/components/default-avatar';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
  refresh_token: state.auth.refresh_token,
  default_avatar: state.auth.default_avatar,
  image_url: state.auth.image_url,
});

export const HeaderMainPage: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const navigation = useNavigation();

  const handleUserProfile = () => {
    navigation.navigate(Screen.Setting.Main);
  };
  const handleNotification = async () => {
    const notificationList = await fetchAllNotification();
    navigation.navigate(Screen.Common.Notification, {notificationList});
  };

  return (
    <>
      <View style={styles.header}>
        <IconButton onClick={handleNotification} icon={NotificationIcon} />

        <SearchBar />

        <Pressable style={styles.userButton} onPress={handleUserProfile}>
          <View>
            {props.refresh_token !== null ? (
              props.image_url === null ? (
                <>
                  <DefaultAvatar size={40} type={props.default_avatar} />
                </>
              ) : (
                <>
                  <Image
                    source={{uri: props.image_url}}
                    style={{height: 40, width: 40, borderRadius: 20}}
                  />
                </>
              )
            ) : (
              <UserIcon />
            )}
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default connect(mapStateToProps, null)(HeaderMainPage);

type StateProps = ReturnType<typeof mapStateToProps>;
