import { Dimensions, StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    bodyContainer: {
        marginHorizontal: -15,
    },
    body: {
        width: width - 30,
        // paddingH: 15,
        // marginHorizontal: -15,
        // paddingHorizontal: 15,
        // paddingRight: 15,
    },
});
