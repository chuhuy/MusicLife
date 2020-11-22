import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import I18n from '../../../../i18n';
import { BaseScreen } from '../../../../shared/components';
import { styles } from './styles';

interface Props {
    navigation: any,
}
const EditProfile: React.FunctionComponent<Props> = (props: Props) => {
    const [name, setName] = useState<string>('Hoang Anh');
    const handleSaveName = () => {
        Alert.alert(`Your name has been changed to ${name}`)
    } 
    return (
        <BaseScreen isScroll={true}>
            <View style={styles.content}>
                <Image source={ require( '../../../../assets/img/avatar.png')} style={styles.avatar} />
                <TextInput
                    style={styles.input}
                    defaultValue={name}
                    onChangeText={text => setName(text)}
                />
                <Pressable onPressOut={handleSaveName}>
                    <View style={styles.btn}>
                        <Text style={styles.btn__title}>{I18n.translate('setting.save')}</Text>
                    </View>
                </Pressable>
            </View>
        </BaseScreen>
    )
}

export default EditProfile;
