import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
    },
    layer: {
        position: 'absolute',
        backgroundColor: styleVars.blackColor,
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    imageBackground: {
        height: height,
        width: '100%',
    },
    control: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 35,
        paddingHorizontal: 20,
    },
    buttonGroup2: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 70,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    song: {
        color: styleVars.white,
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
        right: 0,
    },
    tab: {
        width: width,
        paddingHorizontal: 20,
    },
    dotGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: -5,
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 50,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    dotDefault: {
        borderColor: styleVars.white,
    },
    dotActive: {
        borderColor: styleVars.secondaryColor,
        backgroundColor: styleVars.secondaryColor,
    },
    lyricContainer: {
        marginVertical: 15,
    },
    lyricRow: {
        width: '100%',
        color: styleVars.lightWhite,
        textAlign: 'center',
        fontSize: styleVars.baseFontSize,
        marginVertical: 10,
    }
});
