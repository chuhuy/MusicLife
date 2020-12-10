import React, {FunctionComponent} from 'react';
import { Text, Pressable, View} from 'react-native';
import { styles } from './styles';

interface Props {
    onClick: () => void,
    title: string,
    color?: string,
    position?: boolean,
    border?: boolean,
}

export const LinkButton: FunctionComponent<Props> = (props: Props) => {
    const {
        onClick,
        title,
        color,
        position,
        border,
    } = props;

    return (
        <>
            <Pressable
                style={[styles.container, position && styles.center]}
                onPressIn={onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={[styles.title, {color}, border && styles.border]}>{title}</Text>
                </View>
            </Pressable>
        </>
    );
};
