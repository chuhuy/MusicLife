import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import {styles} from './styles';
import I18n from '../../../../i18n';
import ArrowBackSvg from '../../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { changeLanguage, getLanguage } from '../../../../i18n/utils';
import LanguageSvg from '../../../../assets/icons/language.svg';

interface Props {
    navigation: any,
}

const ChangeLanguage: React.FunctionComponent<Props> = (props: Props) => {
    const [languageActive, setLanguageActive] = useState<Boolean>(true);
    useEffect(() => {
        const getLanguageActive = async() => {
            const active = await getLanguage();
            setLanguageActive(active === 'vi');
        }
        getLanguageActive();
    }, [])
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20} style={styles.back} />
                    </TouchableOpacity>
                    <View style={styles.header__right}>
                        <Text style={styles.title}>{I18n.translate('setting.change-language')}</Text>
                    </View>
                    
                </View>
                <View style={styles.main}>
                    <TouchableOpacity  onPressOut={() => handleChangeLanguage('vi')}>
                        <View style={styles.option}>
                            <View style={styles.check}>
                                {languageActive ? <LanguageSvg width={20} height={20}/> : null}
                            </View>
                            <Text style={styles.option__text}>Vietnamese</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPressOut={() => handleChangeLanguage('en')}>
                        <View style={styles.option} >
                          
                            <View style={styles.check}>
                                {!languageActive ? <LanguageSvg width={20} height={20}/> : null}
                            </View>
                            <Text style={styles.option__text}>English</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default ChangeLanguage;