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
        backgroundColor: 'black',
        opacity: 0.25
    },
    backContainer: {
        paddingLeft: 15
    },
    image: {
        width: (height * 0.4) - 150,
        height: (height * 0.4) - 150,
        alignSelf: 'center',
    },
    sectionOne: {
        flex: 2,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 10
    },
    sectionOneContent: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
    },
    sectionTwo: {
        flex: 3,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    control: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleGroup: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 30
    },
    playlistName: {
        fontSize: styleVars.bigFontSize,
        color: styleVars.white,
        fontWeight: '700',
    },
    artist: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.greyColor,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -15
    },
    button: {
        paddingHorizontal: 15,
    },
});
