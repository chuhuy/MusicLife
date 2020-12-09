import { StyleSheet } from 'react-native';
import { styleVars } from '../../constance/style-variables';

export const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: styleVars.primaryColor,
        marginBottom: 30,
    },
    userButton: {
        borderWidth: 1,
        borderColor: styleVars.secondaryColor,
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
