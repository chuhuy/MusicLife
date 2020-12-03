import {Dimensions, StyleSheet} from 'react-native';
import {styleVars} from '../../constance/style-variables';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: styleVars.bgModalColor,
        flex: 1,
        width: width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginHorizontal: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        backgroundColor: styleVars.bgTopModalColor,
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
