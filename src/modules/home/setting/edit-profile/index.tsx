import React, {useState} from 'react';
import { Text, View, Image, TextInput, Alert } from 'react-native';
import {styles} from './styles';
import I18n from '../../../../i18n';
import ArrowBackSvg from '../../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../../../shared/components';

interface Props {
    navigation: any,
}

const EditProfile: React.FunctionComponent<Props> = (props: Props) => {
    const [name, setName] = useState<string>('Hoang Anh');
   
    const handleSaveName = () => {
        Alert.alert(`Your name has been changed to ${name}`)
    } 
    return (
       
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                    <ArrowBackSvg width={20} height={20} />
                </TouchableOpacity>
                <View style={styles.header__right}>
                    <Text style={styles.title}>{I18n.translate('setting.editProfile')}</Text>
                </View>
                
            </View>
            <View style={styles.main}>
                
                <Image source={ require( '../../../../assets/img/avatar.png')} style={styles.avatar} />
                
                <TextInput
                    style={styles.input}
                    defaultValue={name}
                    onChangeText={text => setName(text)}
                />
                
            </View>
            <TouchableOpacity onPressOut={handleSaveName}>
                    <View style={styles.btn}>
                        <Text style={styles.btn__title}>{I18n.translate('setting.save')}</Text>
                    </View>
            </TouchableOpacity>
        </View>
        
    )
}
export default EditProfile;