import { StyleSheet, Dimensions } from 'react-native';
import { isLargeDevice, styleVars } from '../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    container:{
        flex: 1,
    },
    headerContainer:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: isLargeDevice() ? 60 : 50,  
        height: isLargeDevice() ? 70 : 60,
    },
    appName:{
        paddingTop: 15,
        fontSize: styleVars.largeFontSize,
        fontWeight: "bold",
        color: styleVars.secondaryColor,
    },
    formContainer: {
        flex: 4,
    },
    inputGroup: {
        marginBottom: isLargeDevice() ? 20 : 15,
    },
    textInput: {
        backgroundColor: styleVars.lightPrimaryColor,
        color: styleVars.white,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginBottom: 10,
    },
    textSecurity:{
        width: 24,
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 0,
        zIndex: 10,
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
        marginHorizontal: (width - 140) / 2,
    },
    linkButtonGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});
