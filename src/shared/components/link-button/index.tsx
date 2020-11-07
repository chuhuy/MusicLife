import React, {FunctionComponent} from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';

interface Props {
    onClick: () => void;
    title: string;
    color?: string
}

export const LinkButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPressOut={props.onClick}
                delayPressIn={0}
            >
                <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
};
