import { StyleSheet } from 'react-native';
import { styleVars } from './../../constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 15,
        borderRadius: 20,
        height: 40,
        backgroundColor: styleVars.lightPrimaryColor,
    },
    bigContainer: {
        marginLeft: 0
    },
    input: {
        flex: 1,
        paddingRight: 15,
        overflow: "hidden",
        color: styleVars.greyColor,
    }
});
