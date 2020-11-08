import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const isLargeDevice = () => height > 700;

export const styleVars = {
    // Font size
    largeFontSize: isLargeDevice() ? 25 : 20,
    bigFontSize: isLargeDevice() ? 20 : 18,
    baseFontSize: isLargeDevice() ? 16 : 14,
    smallFontSize: isLargeDevice() ? 14 : 12,

    // Colors
    bgToastColor: '#E5E5E5',
    primaryColor: '#020403',
    lightPrimaryColor: '#1B1B1B',
    secondaryColor: '#D63346',
    greyColor: '#868686',
    white: '#fff',
    redColor: '#F70000',
    greenColor: '#388E3C',
    crimsonColor: '#DC143C',
};
