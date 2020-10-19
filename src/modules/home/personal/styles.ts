import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000A19',
    },
    header: {
        width: width,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000A19',
        paddingVertical: 20,
    },
    userButton: {
        borderWidth: 1,
        borderColor: '#F34E5F',
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
        marginVertical: 10,
    },
    locationButton: {
        marginRight: 20,
    },
    locationTitleActive: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    locationTitleInactive: {
        color: '#A7A7A7',
        fontSize: 20,
    },
});
