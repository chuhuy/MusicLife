import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../constance/style-variables';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: width * 0.7,
        height: 40,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 20,
        paddingHorizontal: 20,
        color: styleVars.greyColor,
    },
});
