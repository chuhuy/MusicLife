import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    header: {
        paddingHorizontal: 20,
        width: width,
        marginTop: 20,
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: 100,
    },
    image: {
        width: (height * 0.4) - 150,
        height: (height * 0.4) - 150,
        alignSelf: 'center',
    },
    sectionOne: {
        flex: 2,
        width: width,
        opacity: 0.7,
    },
    sectionTwo: {
        flex: 3,
        backgroundColor: styleVars.primaryColor,
        width: width,
        paddingHorizontal: 20,
    },
    control: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    titleGroup: {
        flexDirection: 'column',
    },
    playlistName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 14,
        color: styleVars.greyColor,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 12,
    },
});
