import AsyncStorage from '@react-native-community/async-storage';
import { authReducer } from './../../redux/modules/auth/reducer';

export const saveTokenToLocalStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (err) {
        console.log(err);
    }
}

export const getTokenFromLocalStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(token !== null) {
            return token;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
}

export const removeTokenFromLocalStorage = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (err) {
        console.log(err);
    }
}