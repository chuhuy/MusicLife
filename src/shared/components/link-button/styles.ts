import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: styleVars.baseFontSize,
        fontWeight: '700'
    },
    touchArea: {
        padding: 5
    },
});
