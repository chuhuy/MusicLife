import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonLayout: {
        alignSelf: 'center',
        backgroundColor: styleVars.secondaryColor,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
    },
    text: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5
    },
});
