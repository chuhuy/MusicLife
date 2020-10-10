import React, {FunctionComponent} from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';

interface Props {
    onClick: () => void;
    title: string;
}

export const LinkButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
};
