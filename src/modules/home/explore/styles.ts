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
    chart: {
        marginVertical: 10,
    },
    chartTitle: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    chartTitleActive: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    chartTitleInactive: {
        color: styleVars.greyColor,
        fontSize: 20,
    },
    chartButton: {
        marginRight: 20,
    },
    latestSong: {
        width: width,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    latestPlaylist: {
        width: width,
        marginVertical: 10,
    },
    latestPlaylistTitle: {
        marginHorizontal: 20,
    },
    multipleRow: {
        flexDirection: 'column',
    },
    latestGenre: {
        width: width,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 40,
    },
});
