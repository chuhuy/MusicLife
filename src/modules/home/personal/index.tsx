/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';

interface Props {}

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <View style={styles.container}>
                <Text>{I18n.translate('personal.title')}</Text>
            </View>
        </>
    )
}