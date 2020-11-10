/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';
import { IconButton } from './../../../shared/components';

interface Props {
    route: any
}

const NotificationScreen: React.FunctionComponent<Props> = (props: Props) => {

    const { notificationList } = props.route.params;
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
                    <FlatList
                        data={notificationList}
                        renderItem={({item}) => (<NotificationItem title={item.title} image_url={item.image_url} body={item.body} created_at={item.created_at} />)}
                        keyExtractor={item => item.id.toString()}
                    />
            </View>
        </>
    );
};

interface NotificationItemProps {
    title: string,
    body: string,
    image_url: string,
    created_at: string,
}

const NotificationItem: React.FunctionComponent<NotificationItemProps> = (props: NotificationItemProps) => {
    return (
        <>
            <View style={styles.item}>
                <Image source={{uri: props.image_url || ''}} style={styles.image}/>
                <View style={styles.textGroup}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.body}>{props.body}</Text>
                    <Text style={styles.time}>{props.created_at}</Text>
                </View>
            </View>
        </>
    );
};

export default NotificationScreen;
