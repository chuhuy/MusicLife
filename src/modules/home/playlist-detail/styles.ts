import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    blurLayer: {
        position: 'absolute',
        width: '100%',
        height: 500,
        top: 0,
        left: 0,
        backgroundColor: styleVars.blackColor,
        opacity: 0.4,
    },
    backContainer: {
        paddingLeft: 15,
        marginBottom: 10,
    },
    image: {
        width: (height * 0.4) - 150,
        height: (height * 0.4) - 150,
    },
    sectionOne: {
        flex: 1,
        width: '100%',
        paddingVertical: 20,
    },
    sectionOneContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    sectionTwo: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    control: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleGroup: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 30,
    },
    playlistName: {
        fontSize: styleVars.bigFontSize,
        color: styleVars.white,
        fontWeight: '700',
        marginBottom: 4,
    },
    artist: {
        fontSize: styleVars.baseFontSize,
        fontWeight: '600',
        color: styleVars.lightWhite,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -8,
    },
    button: {
        marginHorizontal: 8,
    },
    playButton: {
        marginRight: 8,
        borderRadius: 50,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleVars.white,
    },
});
