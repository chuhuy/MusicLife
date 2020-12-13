import { StyleSheet } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    contentContainer: {
        marginVertical: 10,
    },
    item: {
        height: 90,
        flexDirection: 'row',
        marginVertical: 5,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    textGroup: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    body: {
        color: styleVars.white,
        fontSize: styleVars.smallFontSize,
    },
    time: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    },
});
