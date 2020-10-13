import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    headerContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    logo:{
        width: 60, 
        height: 70,
    },
    appName:{
        paddingTop: 10,
        fontSize: styleVars.largeFontSize,
        fontWeight: "bold",
        color: styleVars.secondaryColor,
    },
    bodyContainer: {
        flex: 2,
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 15,
        backgroundColor: styleVars.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    error: {
        fontSize: styleVars.smallFontSize,
        color: styleVars.red,
        marginTop: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    textInput: {
        backgroundColor: styleVars.white,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginBottom: 8,
    },
    signInButton: {
        marginBottom: 10,
    },
    separator: {
        marginBottom: 10,
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
    },
    linkButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
