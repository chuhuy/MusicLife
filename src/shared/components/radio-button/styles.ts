import {StyleSheet} from 'react-native';
import {styleVars} from './../../constance/style-variables';

export const styles = StyleSheet.create({
    border: {
        height: 26,
        width: 26,
        borderRadius: 13,
        borderWidth: 3,
        borderColor: styleVars.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 13,
        width: 13,
        borderRadius: 7,
        backgroundColor: '#000',
    },
});
