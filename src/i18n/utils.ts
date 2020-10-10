import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export const changeLanguage = async (language: string) => {
    console.log(language);
    try {
        await AsyncStorage.setItem('language', language);
        RNRestart.Restart();
    } catch (e) {
        console.log(e);
    }
};

export const getLanguage = async () => {
    try {
        const value = await AsyncStorage.getItem('language');
        if (value !== null) {
            return value;
        } else {
            return 'en';
        }
    } catch (e) {
        return 'en';
    }
};
