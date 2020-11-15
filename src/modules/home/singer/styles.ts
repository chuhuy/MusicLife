import { StyleSheet } from 'react-native';
import { styleVars } from '../../../shared/constance/style-variables';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        height: '120%',
    },
    main: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        opacity: 0.9,
    },
    header: {
        backgroundColor: styleVars.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 20,
        opacity: 0.9,
    },
    avatarView: {
        height: 300,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundAvatar: {
        zIndex: 1,
        width: 400,
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        opacity: 0.2,
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 125,
        zIndex: 100,
    },
    name: {
        color: styleVars.white,
        textTransform: 'uppercase',
        fontSize: styleVars.largeFontSize,
        fontWeight: '700',
        marginVertical: 30,
    },
    content:{
        marginHorizontal: 20,
    },
    info: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        fontWeight: '700',
        marginBottom: 10,
    },
    description: {
        color: styleVars.white,
        fontSize: styleVars.smallFontSize,
        marginBottom: 20,
        lineHeight: 21,
    },
    songList: {
        marginHorizontal: 20,
    },
    songText: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        fontWeight: '700',
        marginBottom: 10,
    },
});
