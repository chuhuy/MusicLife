import React, {useState} from 'react';
import { Text, View, Image, TextInput, Alert } from 'react-native';
import {styles} from './styles';
import I18n from '../../../i18n';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    navigation: any,
}

const EditProfile: React.FunctionComponent<Props> = (props: Props) => {
    const [name, setName] = useState<string>('Hoang Anh');
    const handleConfirmName = () => {
        Alert.alert('confirmName')
    }
    return (
       
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                    <ArrowBackSvg width={20} height={20} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.title}>{I18n.translate('setting.editProfile')}</Text>
                <TouchableOpacity onPressOut={handleConfirmName}>
                    <Text style={{paddingHorizontal: 10, color: '#fff', fontSize: 18}}>{I18n.translate('setting.save')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Image source={ require( '../../../assets/img/avatar.png')} style={styles.avatar}/>
                
                <TextInput
                    style={styles.input}
                    defaultValue={name}
                    onChange={text => setName(text)}
                />
                
            </View>

        </View>
        
    )
}
export default EditProfile;