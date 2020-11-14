/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {SearchBar} from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';
import NotificationIcon from './../../../assets/icons/notification-active.svg';

interface Props {
    navigation: any,
}

export const HeaderMainPage: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation} = props;

    const handleUserProfile = () => {
        navigation.navigate('Setting');
    };
    const handleNotification = () => {
        navigation.navigate('Notification');
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    delayPressOut={0}
                    onPressOut={handleNotification}>
                    <NotificationIcon />
                </TouchableOpacity>
                
                <SearchBar />

                <TouchableOpacity
                    style={styles.userButton}
                    onPressOut={handleUserProfile}>
                    <UserIcon />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default HeaderMainPage;
