import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        margin: -10
    },
    title: {
        fontSize: styleVars.smallFontSize,
        fontWeight: '600',
        letterSpacing: 2
    },
    touchArea: {
        padding: 10
    },
});
