import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        backgroundColor: styleVars.lightPrimaryColor,
        width: width,
        height: 65,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section: {
        flexDirection: 'row',
    },
    image: {
        height: 45,
        width: 45,
        marginRight: 10,
    },
    titleGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    song: {
        color: 'white',
        fontSize: 16,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: 14,
    },
    view: {
        backgroundColor: styleVars.primaryColor,
    },
    button: {
        marginHorizontal: 5,
    },
});
