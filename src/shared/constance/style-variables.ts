import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const isLargeDevice = () => height > 700;

export const styleVars = {
    // Font size
    largeFontSize: 25,
    bigFontSize: 20,
    baseFontSize: 18,
    smallFontSize: 16,

    // Colors
    bgToastColor: '#E5E5E5',
    primaryColor: '#020403',
    lightPrimaryColor: '#1B1B1B',
    secondaryColor: '#D63346',
    greyColor: '#868686',
    white: '#fff',
    lightWhite: '#EAEAEA',
    redColor: '#F70000',
    greenColor: '#388E3C',
    crimsonColor: '#DC143C',
    blackColor: '#000',
    bgModalColor: '#23262B',
    bgTopModalColor: '#33363B',
};
