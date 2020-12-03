import { StyleSheet } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: styleVars.lightPrimaryColor,
        width: '100%',
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
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize,
    },
    view: {
        backgroundColor: 'transparent',
    },
    button: {
        marginHorizontal: 5,
    },
});
