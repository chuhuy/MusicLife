import { styleVars } from './../../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20
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
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    header__right:{
        width: '100%',
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    main: {
        width: '100%',
        marginTop: '10%',
        paddingHorizontal: '5%'
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
        color: styleVars.crimsonColor, 
        marginTop: 5
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
        fontWeight: '700',
        textTransform: 'uppercase',
    }
});