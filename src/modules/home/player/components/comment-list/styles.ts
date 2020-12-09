import { StyleSheet } from 'react-native';
import { styleVars } from '../../../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    commentOuterWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    commentWrapper: {
        paddingVertical: 10,
        marginVertical: 10,
        flexDirection: 'row',
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    avatar: {
        width: 45,
        height: 45,
        marginRight: 10,
        borderRadius: 45,
    },
    contentTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    name: {
        color: styleVars.white,
        fontWeight: '700',
        fontSize: styleVars.smallFontSize,
        letterSpacing: 2,
        flex: 1,
        paddingRight: 10,
    },
    content: {
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
    },
    time: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize,
    },
});
