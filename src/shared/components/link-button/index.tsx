import React, {FunctionComponent} from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
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
                onPress={props.onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};
