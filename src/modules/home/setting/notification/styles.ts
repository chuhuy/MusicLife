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
        marginTop: 10
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 15,
        marginVertical: 5
    },
    notification__img: {
        width: 90,
        height: 90,
        
        
    },
    notification__main: {
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    notification__title: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,

    },
    notification__content: {
        color: styleVars.white,
        fontSize: styleVars.smallFontSize,
        
       
    },
    notification__time: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    }
});