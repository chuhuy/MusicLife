import { StyleSheet } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: styleVars.lightPrimaryColor,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    buttonGroup: {
        marginHorizontal: -8
    },
    button: {
        paddingHorizontal: 8,
    },
});
