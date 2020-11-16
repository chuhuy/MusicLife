import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    latestPlaylist: {
        width: width,
        marginVertical: 20,
        justifyContent: 'space-between',
        
    },
    latestPlaylistTitle: {
        marginHorizontal: 20,
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    header: {
        width: width,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: styleVars.greyColor,
        marginBottom: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    multipleRow: {
        flexDirection: 'column',
        flex: 5,
    },
});