import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    layer: {
        position: 'absolute',
        backgroundColor: styleVars.blackColor,
        width: '100%',
        height: '100%',
        opacity: 0.4
    },
    imageBackground: {
        height: height,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 35,
    },
    buttonGroup2: {
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 70,
    },
    header: {
        width: width,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentHeader: {
        width: width,
        height: 85,
        backgroundColor: styleVars.secondaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    commentText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    song: {
        color: 'white',
        fontSize: styleVars.bigFontSize,
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    artist: {
        color: styleVars.lightWhite,
        fontSize: styleVars.baseFontSize,
        alignSelf: 'center',
    },
    disk: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginVertical: 20,
    },
    comment: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    },
    tab: {
        width: width,
        flex: 1,
    },
    dotGroup: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: -5
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 50,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    dotDefault: {
        borderColor: styleVars.white
    },
    dotActive: {
        borderColor: styleVars.secondaryColor, 
        backgroundColor: styleVars.secondaryColor
    }
});
