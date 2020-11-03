import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: styleVars.white,
        alignItems: 'center',
    },
    text: {
        color: styleVars.secondaryColor,
        fontSize: styleVars.baseFontSize,
        fontWeight: 'bold'
    },
});
