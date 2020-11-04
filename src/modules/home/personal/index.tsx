/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';
import { SearchBar } from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';
import Controller from '../controller';

interface Props {
    navigation: any,
}

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const [isShowAll, setShowAll] = useState(true);

    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };

    const handleUserProfile = () => {
        props.navigation.navigate('Setting');
    };

    return (
        <>
            <View style={styles.header}>
                    <SearchBar/>
                    <TouchableOpacity
                        style={styles.userButton}
                        onPressOut={() => handleUserProfile()}>
                        <UserIcon />
                    </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.locationTitle}>
                    <TouchableOpacity
                        style={styles.locationButton}
                        activeOpacity={1}
                        onPressIn={() => {setShowAll(true);}}>
                        <Text style={isShowAll ? styles.locationTitleActive : styles.locationTitleInactive}>{I18n.translate('personal.all')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => {setShowAll(false);}}>
                        <Text style={isShowAll ? styles.locationTitleInactive : styles.locationTitleActive}>{I18n.translate('personal.device')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Controller />
        </>
    );
};
