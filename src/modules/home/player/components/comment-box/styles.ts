import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from '../../../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
    },
    header: {
        backgroundColor: styleVars.lightPrimaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    commentTitle: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
    },
    body: {
        flex: 1,
        backgroundColor: '#020403',
        height: height * 0.6 - 70,
    },
    commentInput: {
        width: width - 40,
        height: 60,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 43,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    input: {
        color: styleVars.white,
        height: 60,
        fontSize: styleVars.baseFontSize,
    },
    loginButton: {
        marginBottom: 20,
    },
});
