import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: styleVars.smallFontSize,
        fontWeight: '600',
        letterSpacing: 2,
    },
    center: {
        alignItems: 'center',
    },
    touchArea: {
        padding: 10,
    },
    border: {
        borderRightColor: styleVars.greyColor,
        borderRightWidth: 1,
    }
});
