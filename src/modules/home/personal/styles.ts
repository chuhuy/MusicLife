import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    header: {
        width: width,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20,
    },
    userButton: {
        borderWidth: 1,
        borderColor: styleVars.secondaryColor,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTitle: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    locationButton: {
        marginRight: 20,
    },
    locationTitleActive: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    locationTitleInactive: {
        color: styleVars.greyColor,
        fontSize: 20,
    },
});
