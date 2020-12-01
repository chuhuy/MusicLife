/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Alert, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './styles';

interface Props {
    selected: boolean;
    borderStyle: object;
    inputStyle: object;
    borderStyleActive: object;
}

const RadioButton: React.FunctionComponent<Props> = (props: Props) => {
    const {selected, borderStyle, inputStyle, borderStyleActive} = props;

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.border,
                    borderStyle,
                    selected && borderStyleActive,
                ]}>
                {selected ? <View style={[styles.input, inputStyle]} /> : null}
            </TouchableOpacity>
        </>
    );
};

export default RadioButton;
