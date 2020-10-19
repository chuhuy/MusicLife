import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: width,
    },
    header: {
        height: 70,
        width: width,
        backgroundColor: '#1B1B1B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    commentTitle: {
        color: 'white',
        fontSize: 18,
    },
    body: {
        width: width,
        backgroundColor: '#020403',
        height: height * 0.6 - 70,
    },
    commentInput: {
        width: width - 40,
        height: 65,
        backgroundColor: '#1B1B1B',
        borderRadius: 43,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentList: {
        flex: 1,
    },
    input: {
        color: 'white',
    },
});
