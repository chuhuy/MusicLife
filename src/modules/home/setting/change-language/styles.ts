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
});