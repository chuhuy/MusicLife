import { styleVars } from './../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center'
    },
    info: {
        backgroundColor: styleVars.lightPrimaryColor,
        height: '20%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        backgroundColor: styleVars.primaryColor,
        // height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: styleVars.greyColor,
        borderBottomWidth: 1,
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
        paddingHorizontal: 15,
        paddingVertical: 30,
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
        marginLeft: 15
    },
    edit__icon: {
        marginRight: '3%',
    },
    main: {
        marginTop: '15%',
    },
    main__item: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        paddingVertical: 20,
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
        width: 22,
    },
    main__item__text: {
        color: styleVars.white,
        width: '100%',
        fontSize: styleVars.baseFontSize,
        marginLeft: 15
    },
    main__icon__arrow: {
        flex: 2,
    },
    modal__language: {
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        width: '100%',
        height: 200,
        borderRadius: 20,
        backgroundColor: styleVars.lightPrimaryColor,
    },
    modal__language__title:{
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '600',
    },
    modal__language__main:{
        marginTop: 15,
    },
    modal__language__label:{
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
        paddingRight: 15
    },
    language__radio: {
        marginBottom: 25,
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
    modal__restart__title:{
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '700',
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