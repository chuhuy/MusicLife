import { StyleSheet } from 'react-native';
import { styleVars } from './../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleVars.lightPrimaryColor,
    },
    logo: {
        marginBottom: 20,
    }
});
