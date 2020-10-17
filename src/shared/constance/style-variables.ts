import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const isLargeDevice = () => height > 700;

export const styleVars = {
    // Font size
    largeFontSize: isLargeDevice() ? 25 : 20,
    bigFontSize: isLargeDevice() ? 20 : 18,
    baseFontSize: isLargeDevice() ? 16 : 14,
    smallFontSize: isLargeDevice() ? 14 : 12,

    // Padding


    // Colors
    primaryColor: '#000A19',
    lightPrimaryColor: '#00132B',
    secondaryColor: '#F34E5F',
    greyColor: '#A7A7A7',
    darkGreyColor: '#333',
    white: '#fff',
    redColor: '#F70000',
    greenColor: '#28A745',
}