import React from 'react';
import { Text, View } from 'react-native';
import {styles} from './styles';
import I18n from './../../../i18n';

interface Props {}

export const Feed: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <View style={styles.container}>
                <Text>{I18n.translate('test')}</Text>
            </View>
        </>
    )
}