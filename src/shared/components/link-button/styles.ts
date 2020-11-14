import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: styleVars.baseFontSize,
    },
    touchArea: {
        padding: 5
    },
});
