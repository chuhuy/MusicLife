import { StyleSheet } from 'react-native';
import { styleVars } from '../../constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
    },
    title: {
        fontSize: styleVars.baseFontSize,
        color: '#FFFFFF',
    },
});
