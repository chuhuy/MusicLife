import { StyleSheet, Dimensions } from 'react-native';
import { isLargeDevice, styleVars } from '../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: styleVars.white,
    },
    headerContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: isLargeDevice() ? 60 : 50,  
        height: isLargeDevice() ? 70 : 60,
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
        backgroundColor: styleVars.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    formContainer: {
        display: 'flex',
    },
    inputGroup: {
        marginBottom: isLargeDevice() ? 20 : 15,
    },
    textInput: {
        backgroundColor: styleVars.white,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginBottom: 8,
    },
    textSecurity:{
        width: 25,
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
        marginHorizontal: (width - 150) / 2,
    },
    linkButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
