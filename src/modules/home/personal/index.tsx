import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';

interface Props {
    navigation: any,
}

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };

    return (
        <>
            <View style={styles.container}>
                <Text>{I18n.translate('personal.title')}</Text>
                <Button title="Play Music" onClick={() => handlePlayMusic()} />
            </View>
        </>
    );
};
