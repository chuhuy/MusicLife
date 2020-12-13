import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    buttonLayout: {
        alignSelf: 'center',
        backgroundColor: styleVars.secondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigButton: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    text: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5
    },
});
