/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Pressable } from 'react-native';
import {styles} from './styles';
import {SearchBar} from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';
import NotificationIcon from './../../../assets/icons/notification-active.svg';
import { fetchAllNotification, insertNotification } from '../../../shared/helper/sqlite';
import { Screen } from '../../constance/screen';
import { useNavigation } from '@react-navigation/native';

interface Props {
}

export const HeaderMainPage: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();

    const handleUserProfile = () => {
        navigation.navigate(Screen.Setting.Main);
    };
    const handleNotification = async () => {
        const notificationList = await fetchAllNotification();
        navigation.navigate(Screen.Common.Notification, { notificationList });
    };

    return (
        <>
            <View style={styles.header}>
                <Pressable onPress={handleNotification} >
                    <NotificationIcon />
                </Pressable>
                
                <SearchBar navigation={navigation} />

                <Pressable
                    style={styles.userButton}
                    onPress={handleUserProfile}>
                    <UserIcon />
                </Pressable>
            </View>
        </>
    );
};

export default HeaderMainPage;
