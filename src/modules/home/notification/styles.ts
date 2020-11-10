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
    item: {
        width: width,
        paddingHorizontal: 20,
        height: 90,
        flexDirection: 'row',
        marginVertical: 5,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    textGroup: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    body: {
        color: 'white',
        fontSize: 14,
    },
    time: {
        color: styleVars.greyColor,
        fontSize: 14,
    },
});
