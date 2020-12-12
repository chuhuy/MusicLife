import { Dimensions, StyleSheet } from 'react-native';
import { styleVars } from '../../constance/style-variables';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: styleVars.bgModalColor,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: -20,
        marginBottom: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        backgroundColor: styleVars.bgTopModalColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    main: {
        width: '100%',
        minHeight: height * 0.3,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    image: {
        width: 50,
        height: 50,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 20
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: styleVars.smallFontSize
    },
});
