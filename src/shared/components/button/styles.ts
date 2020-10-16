import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: styleVars.secondaryColor,
        alignItems: 'center',
    },
    text: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
});
