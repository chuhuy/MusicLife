/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import axios from 'axios';
import { Button } from './../../../shared/components';

interface Props {}

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const testApi = () => {
        axios.get('https://temperature-sensor-uet.herokuapp.com/api/fetchAll')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            // console.log(error);
        })
    };

    return (
        <>
            <View style={styles.container}>
                <Text>{I18n.translate('personal.title')}</Text>
                <Button title="Test" onClick={() => testApi()} />
            </View>
        </>
    )
}