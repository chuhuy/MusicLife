import React, {FunctionComponent} from 'react';
import { Text, Pressable, View} from 'react-native';
import { styleVars } from '../../constance/style-variables';
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
    } = props;

    return (
        <>
            <Pressable
                style={[styles.container, position && styles.center]}
                onPressIn={onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={[styles.title, {color}]}>{title}</Text>
                </View>
            </Pressable>
        </>
    );
};
