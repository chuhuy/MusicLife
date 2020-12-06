/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Pressable } from 'react-native';
import {styles} from './styles';
import UserIcon from './../../../assets/icons/user.svg';
import NotificationIcon from './../../../assets/icons/notification-active.svg';
import { fetchAllNotification, insertNotification } from '../../../shared/helper/sqlite';
import { Screen } from '../../constance/screen';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../search-bar';
import { IconButton } from '../icon-button';

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
                <IconButton 
                    onClick={handleNotification}
                    icon={NotificationIcon}
                />
                
                <SearchBar />

                <Pressable
                    style={styles.userButton}
                    onPress={handleUserProfile}>
                        <View>
                            <UserIcon />
                        </View>
                </Pressable>
            </View>
        </>
    );
};

export default HeaderMainPage;
