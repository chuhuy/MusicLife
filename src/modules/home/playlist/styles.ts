import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000A19',
    },
    header: {
        paddingHorizontal: 20,
        width: width,
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: 100,
    },
    sectionOne: {
        flex: 2,
        backgroundColor: 'blue',
        width: width,
    },
    sectionTwo: {
        flex: 3,
        backgroundColor: 'green',
        width: width,
    }
});
