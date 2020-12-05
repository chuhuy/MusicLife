import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    layer: {
        position: 'absolute',
        backgroundColor: styleVars.blackColor,
        width: '100%',
        height: '100%',
        opacity: 0.4
    },
    imageBackground: {
        flex: 1,
        resizeMode: "center",
        justifyContent: "center",
    },
    container: {
        marginBottom: -30,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        opacity: 0.8,
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
        paddingBottom: 30,
        marginTop: -5
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
