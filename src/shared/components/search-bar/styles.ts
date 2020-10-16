import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
});
