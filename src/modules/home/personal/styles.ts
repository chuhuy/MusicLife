import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    header: {
        width: width,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20,
    },
    userButton: {
        borderWidth: 1,
        borderColor: styleVars.secondaryColor,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTitle: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 5,
    },
    locationButton: {
        marginRight: 20,
    },
    locationTitleActive: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    locationTitleInactive: {
        color: styleVars.greyColor,
        fontSize: 20,
    },
    typeTitle: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    typeButton: {
        marginRight: 20,
    },
    typeTitleActive: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    typeTitleInactive: {
        color: styleVars.greyColor,
        fontSize: 16,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
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
