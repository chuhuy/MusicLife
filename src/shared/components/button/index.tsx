import React, { FunctionComponent } from 'react';
import { Pressable, View, Text } from 'react-native';
import {styles} from './styles';

interface Props {
    onClick: () => void;
    title: string;
    disabled?: boolean,
    size?: string,
    icon?: SVGElement,
}

export const Button: FunctionComponent<Props> = (props: Props) => {
    const { onClick, title, disabled = false, size, icon } = props;

    return (
        <>
            <Pressable
                disabled={disabled}
                style={[styles.buttonLayout, {opacity: disabled ? 0.6 : 1}]}
                onPressOut={onClick}
            >
                <View style={[styles.button, size ? styles.bigButton : undefined]}>
                    {icon}
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </>
    );
};
