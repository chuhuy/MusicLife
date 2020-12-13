import React from 'react';
import { Pressable, Image, Text } from 'react-native';
import { styles } from './styles';

interface Props {
    title: string,
    onClick: () => void,
    image: string
}

export const MusicChartItem: React.FunctionComponent<Props> = (props: Props) => {
    const { title, image, onClick } = props;
    return (
        <>
            <Pressable
                style={styles.container}
                onPressIn={onClick}>
                <Image style={styles.image} source={{uri: image}}/>
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </>
    );
};

