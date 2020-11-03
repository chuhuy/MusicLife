import { styleVars } from './../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        flexDirection: "column",
    },
    info: {
        backgroundColor: styleVars.lightPrimaryColor,
        height: '20%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10%',
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
    info__left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '4%',
        
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 50,
    },
    name: {
        color: styleVars.white,
        fontSize: styleVars.largeFontSize,
        fontWeight: 'bold',
        marginLeft: '5%'
    },
    edit__icon: {
        marginRight: '3%',
        
    },
    main: {
        flexDirection: 'column',
        marginTop: '15%',
    },
    main__item: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        alignItems: 'center',
        
    },
    main__rule: {
        borderBottomWidth: 2,
        borderBottomColor: styleVars.greyColor,
        width: '100%',
       
    },
    main__left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    main__left__svgView: {
        width: 30,
    },
    main__item__text: {
        color: styleVars.white,
        width: '100%',
        fontSize: styleVars.baseFontSize,
        marginLeft: 5
    },
    main__icon: {
        
    },
    main__icon__arrow: {
        flex: 2,
    },

    // Modal 

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