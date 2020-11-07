import React, {FunctionComponent, useEffect, useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {styles} from './styles';

interface Props {
    onClick: () => void;
    title: string;
    disabled?: boolean
}

export const Button: FunctionComponent<Props> = (props: Props) => {
    const { onClick, title, disabled = false } = props;

    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                delayPressIn={0}
                activeOpacity={0.75}
                style={[styles.container, {opacity: disabled ? 0.8 : 1}]}
                onPressOut={onClick}
            >
                <View style={styles.buttonLayout}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};
