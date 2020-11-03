import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageBackground: {
        height: height,
        width: width,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: width,
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
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: 14,
        alignSelf: 'center',
    },
    disk: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 1,
        borderColor: 'white',
        marginVertical: 20,
    },
    comment: {
        position: 'absolute',
        bottom: 0,
    },
    tab: {
        width: width,
        flex: 1,
    },
    dotGroup: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 5,
    },
});
