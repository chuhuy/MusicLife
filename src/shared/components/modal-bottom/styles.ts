import {StyleSheet} from 'react-native';
import {styleVars} from '../../constance/style-variables';

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: styleVars.primaryColor,
        flex: 1,
        width: '111%',
        position: 'absolute',
        left: -20,
        bottom: -20,
    },
    header: {
        backgroundColor: styleVars.lightPrimaryColor,
        minHeight: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    main: {
    },
    image: {
        width: 50,
        height: 50,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    },
    options: {
        width: '100%',
        marginTop: 20,
    },
});
