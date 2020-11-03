import { styleVars } from './../../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: styleVars.primaryColor,
        flexDirection: 'column',
    },
    header: {
        
        backgroundColor: styleVars.primaryColor,
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: styleVars.greyColor,
        borderBottomWidth: 1,
        paddingHorizontal: '3%'
    },
    header__right:{
        width: '100%',
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: '10%'
    },
    back:{
       
    },
    main: {
        flexDirection: 'column',
        
        width: '100%',
    },
    option: {
        height: 70,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: styleVars.white,
        borderBottomWidth: 1,
        
    },
    option__text: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
    },
    check: {
        width: 30
    },
    rule: {
        borderBottomColor: styleVars.greyColor,
        borderBottomWidth: 2,
    }
=======
    
    
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
>>>>>>> dev
});