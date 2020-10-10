import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        fontSize: 10,
        color: 'red',
    },
    textInput: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textInputLabel: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    signInButton: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    separator: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    separatorLine: {
        height: 1,
        flex: 1,
        backgroundColor: '#000',
    },
    separatorLabel: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: (width - 110) / 2,
        marginBottom: 40,
    },
    linkButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
});
