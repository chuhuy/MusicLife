import React, {FunctionComponent} from 'react';
import { Text, Pressable, View} from 'react-native';
import { styles } from './styles';

interface Props {
    onClick: () => void;
    title: string;
    color?: string
}

export const LinkButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Pressable
                style={styles.container}
                onPressIn={props.onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
                </View>
            </Pressable>
        </>
    );
};
