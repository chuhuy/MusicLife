import {StyleSheet} from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: styleVars.primaryColor,
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
        paddingHorizontal: '2%'
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
    avatar: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginTop: 50
    },
    input: {
        color: styleVars.white,
        borderBottomWidth: 3,
        borderBottomColor: styleVars.greyColor,
        marginTop: 40,
        fontSize: styleVars.largeFontSize,
        fontWeight: '700',
        textAlign: 'center'
    },
    btn:{
        marginTop: '20%',
        alignItems: 'center',
        paddingTop: '6%',
        backgroundColor: styleVars.crimsonColor,
        width: 150,
        height: 50,
        borderRadius: 25
    },
    btn__title:{
        color: styleVars.white,
        textAlign: 'center',
        fontSize: styleVars.bigFontSize,
        fontWeight: '700',
        textTransform: 'uppercase'
    }
});