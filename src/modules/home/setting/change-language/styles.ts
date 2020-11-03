import { styleVars } from './../../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    
    
    modal__language: {
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        width: '100%',
        height: 200,
        borderRadius: 20,
        backgroundColor: styleVars.lightPrimaryColor,
    },
    modal__language__header:{

    },
    modal__language__title:{
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '700',
    },
    modal__language__main:{
        marginTop: 15,
    },
    modal__language__label:{
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize
    },
    modal__language__footer:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modal__language__group:{
        marginLeft: '5%',
        
        padding: 5
    },
    modal__language__footer__text:{
        color: styleVars.crimsonColor,
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold'
    },



    modal__restart: {
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        width: '100%',
        height: 200,
        borderRadius: 20,
        backgroundColor: styleVars.lightPrimaryColor,
    },
    modal__restart__header:{

    },
    modal__restart__title:{
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '700',
    },
    modal__restart__main:{

    },
    modal__restart__main__text:{
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize
    },
    modal__restart__label:{
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize
    },
    modal__restart__footer:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modal__restart__group:{
        marginLeft: '5%',
        
        padding: 5
    },
    modal__restart__footer__text:{
        color: styleVars.crimsonColor,
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold'
    },
});