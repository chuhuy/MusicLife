import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { styles } from './styles';

interface Props {
    title: string,
    onClick: () => void,
    image: string
}

export const MusicChartItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPressOut={props.onClick}>
                <Image style={styles.image} source={{uri: props.image}}/>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
};

