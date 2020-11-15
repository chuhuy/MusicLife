/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import {HeaderBack} from '../../../shared/components/index';
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
                <HeaderBack 
                    navigation={navigation}
                    title='Notification'
                />

                <FlatList
                    contentContainerStyle={styles.contentContainer}
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
    const {title, body, image_url, created_at} = props;

    return (
        <>
            <View style={styles.item}>
                <Image source={{uri: image_url || ''}} style={styles.image}/>
                <View style={styles.textGroup}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.body} numberOfLines={2}>{body}</Text>
                    <Text style={styles.time} numberOfLines={1}>{created_at}</Text>
                </View>
            </View>
        </>
    );
};

export default NotificationScreen;
