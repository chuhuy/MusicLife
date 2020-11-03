import React, {useState, useEffect} from 'react';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import {styles} from './styles';
import I18n from '../../../../i18n';
import ArrowBackSvg from '../../../../assets/icons/arrow-back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { changeLanguage, getLanguage } from '../../../../i18n/utils';
import LanguageSvg from '../../../../assets/icons/language.svg';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
   
}

const ChangeLanguage: React.FunctionComponent<Props> = (props: Props) => {
    
    const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [isModalRestartVisible, setModalRestartVisible] = useState(false);
    const languageList = [
        {label: I18n.translate('changeLanguage.english'), value: 0 },
        {label: I18n.translate('changeLanguage.vietnamese'), value: 1 }
    ];
    const [languageActive, setLanguageActive] = useState<number>();
    const [isLanguageChange, setIsLanguageChange] = useState<boolean>(false);
    useEffect(() => {
        
        const getLanguageActive = async() => {
            const active = await getLanguage();
            setLanguageActive(active === 'en' ? 0 : 1);
            setIsLanguageChange(false);
        }
        
        getLanguageActive();
    }, [])
    
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
    };
    
    const toggleModalLanguage = () => {
        setModalLanguageVisible(!isModalLanguageVisible);
    };
    const toggleModalRestart = () => {
        setModalRestartVisible(!isModalRestartVisible);
    };
    
    return (
        <>
            <View style={{ alignItems:'center', display: 'flex', justifyContent: 'space-between',}}>
                    
                    <Modal isVisible={isModalLanguageVisible} hasBackdrop={true}>
                        
                        <View style={[styles.modal__language, {display: isModalRestartVisible ? 'none' : 'flex'}]}>
                            <TouchableOpacity style={styles.modal__language__header}>
                                <Text style={styles.modal__language__title}>
                                    {I18n.translate('changeLanguage.title')}
                                </Text>
                            </TouchableOpacity>
                            
                            <View style={styles.modal__language__main}>
                                <RadioForm
                                    radio_props={languageList}
                                    initial={languageActive}
                                    formHorizontal={false}
                                    labelHorizontal={true}
                                    buttonColor={styleVars.white}
                                    selectedButtonColor={styleVars.crimsonColor}
                                    buttonWrapStyle={{marginLeft: 10}}
                                    animation={true}
                                    labelStyle={ styles.modal__language__label } 
                                    onPress={(value) => {setIsLanguageChange(!isLanguageChange)}}
                                />
                            </View>
                            <View style={styles.modal__language__footer}>
                                
                                <TouchableOpacity 
                                    onPressOut={toggleModalLanguage} 
                                    style={styles.modal__language__group}
                                >
                                    <Text style={styles.modal__language__footer__text}>{I18n.translate('changeLanguage.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPressOut={() => {
                                        toggleModalRestart();
                                        
                                    }} 
                                    disabled={!isLanguageChange}
                                    style={styles.modal__language__group}
                                >
                                    <Text style={[styles.modal__language__footer__text, {color : isLanguageChange ? styleVars.crimsonColor : styleVars.greyColor}]}>
                                        {I18n.translate('changeLanguage.save')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                        
                    </Modal>
                                    
                    <Modal isVisible={isModalRestartVisible} >
                        
                        <View style={styles.modal__restart}>
                            <View style={styles.modal__restart__header}>
                                <Text style={styles.modal__restart__title}>{I18n.translate('changeLanguage.restartApp')}</Text>
                            </View>
                            
                            <View style={styles.modal__restart__main}>
                                <Text style={styles.modal__restart__main__text}>{I18n.translate('changeLanguage.restartContent')}</Text>
                            </View>
                            <View style={styles.modal__restart__footer}>
                                
                                <TouchableOpacity 
                                    onPressOut={() => {
                                        toggleModalRestart() ;
                                     
                                    }} 
                                    style={styles.modal__restart__group}
                                >
                                    <Text style={styles.modal__restart__footer__text}>{I18n.translate('changeLanguage.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPressOut={() => handleChangeLanguage(languageActive === 1 ? 'en' : 'vi')} 
                                    style={styles.modal__restart__group}
                                >
                                    <Text style={styles.modal__restart__footer__text}>{I18n.translate('changeLanguage.restart')}</Text>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                        
                    </Modal>
                       
                </View>
        </>
    )
}
export default ChangeLanguage;