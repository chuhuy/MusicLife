import React, {FunctionComponent, useEffect, useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {styles} from './styles';

interface Props {
    onClick: () => void;
    title: string;
    disabled?: boolean,
    size?: string
}

export const Button: FunctionComponent<Props> = (props: Props) => {
    const { onClick, title, disabled = false, size } = props;

    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                delayPressIn={0}
                activeOpacity={0.75}
                style={[styles.buttonLayout, {opacity: disabled ? 0.6 : 1}]}
                onPressOut={onClick}
            >
                <View style={size ? styles.bigButton : undefined}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};
