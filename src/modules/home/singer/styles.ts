import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';
export const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        marginBottom: -30,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        opacity: 0.9,
    },
    avatarView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 250,
    },
    name: {
        color: styleVars.white,
        textTransform: 'uppercase',
        fontSize: styleVars.largeFontSize,
        fontWeight: '700',
        marginBottom: 20,
    },
    group:{
        marginBottom: 30,
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '700',
        marginBottom: 15,
    },
    description: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        lineHeight: 20,
    },
});
