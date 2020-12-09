import { Dimensions, StyleSheet } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const {width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        width: width,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: styleVars.lightPrimaryColor,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 20
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10,
    },
    titleGroup: {
        flex: 1,
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: -8,
    },
    button: {
        paddingHorizontal: 8,
    },
});
