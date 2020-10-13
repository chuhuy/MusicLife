import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        height: height,
        width: width,
    },
    headerContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
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
        display: "flex",
        justifyContent: "space-between",
        height: 420,
        padding: 20,
        backgroundColor: styleVars.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    error: {
        fontSize: styleVars.smallFontSize,
        color: styleVars.red,
    },
    textInput: {
        backgroundColor: styleVars.white,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginBottom: 10,
    },
    separator: {
        marginTop: 15,
        marginBottom: 10,
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
        marginBottom: 15,
    },
    linkButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
});
