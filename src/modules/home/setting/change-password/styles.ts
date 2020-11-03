import { styleVars } from './../../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
        width: '100%',
        marginTop: '10%',
        paddingHorizontal: '5%'
    },
    form:{
        
        
    },
    form__group: {
        marginBottom: '10%',
    },
    label: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize
    },
    input: {
        borderWidth: 2,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 15,
        width: '100%',
        color: styleVars.white,
        marginTop: '3%',
        fontSize: styleVars.baseFontSize,
        paddingHorizontal: '3%'
        
    },
    error:{
        fontSize: styleVars.smallFontSize, 
        color: styleVars.redColor, 
        marginTop: 5
    },
    button : {
        
    },
    btn:{
        marginTop: '5%',
        alignItems: 'center',
        paddingTop: '6%',
        backgroundColor: styleVars.crimsonColor,
        width: 150,
        height: 50,
        borderRadius: 25,
        display: 'flex',
    },
    btn__title:{
        color: styleVars.white,
        textAlign: 'center',
        fontSize: styleVars.bigFontSize,
        fontWeight: '700'
    }
});