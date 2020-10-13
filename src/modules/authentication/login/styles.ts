import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: styleVars.white, 
    },
    headerContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    logo:{
        width: 75.46, 
        height: 87.56,
    },
    appTitle:{
        paddingTop: 10,
        fontSize: styleVars.largeFontSize,
        fontWeight: "bold",
        color: styleVars.secondaryColor,
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: styleVars.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    bodyTitle:{
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 15,
    },
    error: {
        fontSize: styleVars.smallFontSize,
        color: styleVars.red,
    },
    textInput: {
        color: styleVars.white,
        borderColor: styleVars.greyColor,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginVertical: 10,
    },
    signInButton: {
        fontSize: styleVars.baseFontSize,
        marginVertical: 10,
    },
    separator: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    separatorLine: {
        height: 1,
        flex: 1,
        backgroundColor: styleVars.white,
    },
    separatorLabel: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginHorizontal: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: (width - 150) / 2,
        marginBottom: 30,
    },
    linkButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
