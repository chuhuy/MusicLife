import { StyleSheet } from 'react-native';
import { styleVars } from '../../../constance/style-variables';

export const styles = StyleSheet.create({
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        marginBottom: 20,
    },
    optionText: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        paddingLeft: 10,
    },
    svg: {
        minWidth: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
