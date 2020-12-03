import { styleVars } from './../../../shared/constance/style-variables';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    inputGroup: {
        marginTop: 100,
    },
    buttonGroup: {

    },
});
