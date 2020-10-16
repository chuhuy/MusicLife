import React,{useState} from 'react';
import { Text, View, Image} from 'react-native';
import {styles} from './styles';
import I18n from './../../../i18n';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    navigation: any,
}

const Notification: React.FunctionComponent<Props> = (props: Props) => {
    const notifications = [
        {
            id: 1,
            title: 'A',
            content: 'abkasjdhada',
            time: '18:00 - 15/7/2020'
        },
        {
            id: 2,
            title: 'B',
            content: 'rfdasdadasasdasddhfsdfdfdfdfdfdfdfdfdfdfdfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddđ',
            time: '18:00 - 15/7/2020'
        },
        {
            id: 3,
            title: 'C',
            content: 'abkasjdfwerfadadadhada',
            time: '18:00 - 15/7/2020'
        }
    ]
    const [notification, setNotification] = useState(notifications);
    return (  
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{I18n.translate('setting.notification')}</Text>
                </View>
                <View style={styles.main}>
                    {notification.map(element => (
                        <TouchableOpacity key={element.id} style={styles.notification}>
                            <Image source={ require( '../../../assets/img/chiphi.jpg')} style={styles.notification__img}/>
                            <View style={styles.notification__main}>
                                <Text style={styles.notification__title}>
                                    {element.title}
                                </Text>
                                <Text style={styles.notification__content} numberOfLines={2}>
                                    {element.content}
                                </Text>
                                <Text style={styles.notification__time}>
                                    {element.time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
    )
}
export default Notification;