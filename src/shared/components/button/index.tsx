import React, {FunctionComponent} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {styles} from './styles';

interface Props {
    onClick: () => void;
    title: string;
}

export const Button: FunctionComponent<Props> = (props: Props) => {


    
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                <View>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}