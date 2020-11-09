import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';
import { IconButton } from './../../../shared/components';

interface Props {}

const NotificationScreen: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowLeft} onClick={() => handleBack()}/>
                        <Text style={styles.headerTitle}>{'Notification'}</Text>
                        <View style={{width: 20}}/>
                    </View>
            </View>
        </>
    );
};

export default NotificationScreen;
