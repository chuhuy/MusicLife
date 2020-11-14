import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    locationTitle: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
    },
    locationButton: {
        marginRight: 20,
    },
    locationTitleActive: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
    },
    locationTitleInactive: {
        color: styleVars.greyColor,
        fontSize: styleVars.bigFontSize,
    },
    typeTitle: {
        flexDirection: 'row',
        marginBottom: 30,
        marginLeft: -5
    },
    typeButton: {
        marginRight: 15,
    },
    typeTitleActive: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        borderBottomColor: styleVars.secondaryColor,
        borderBottomWidth: 2,
        paddingBottom: 10,
        paddingHorizontal: 8
    },
    typeTitleInactive: {
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
        paddingHorizontal: 8
    },
    body: {
        flex: 1,
    },
    addBtnContainer: {
        marginBottom: 30
    },
    addPlaylistModal: {
        width: width / 1.5,
        height: width / 3,
        backgroundColor: styleVars.primaryColor,
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
