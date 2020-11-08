import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

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
        marginBottom: 30,
    },
    logo:{
        alignSelf: 'center',
        width: 40,  
        height: 48,
        marginTop: 15
    },
    formContainer: {
        flex: 1,
    },
    signUpButton: {
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});
