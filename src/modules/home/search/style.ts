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
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20,
    },

    text: {
        fontSize:30,
        fontWeight:'bold',
    },
});