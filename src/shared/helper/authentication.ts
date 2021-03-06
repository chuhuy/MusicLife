import AsyncStorage from '@react-native-community/async-storage';

export const saveTokenToLocalStorage = async (token: string, access_token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('access_token', access_token);
  } catch (err) {
    console.log(err);
  }
};

export const getTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null && token !== '') {
      return token;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const getAccessTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (token !== null && token !== '') {
      return token;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const removeTokenFromLocalStorage = async () => {
  try {
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('access_token', '');
  } catch (err) {
    console.log(err);
  }
};
