import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';

interface Props {}

export const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TextInput
                style={styles.container}
                onChangeText={() => {}}
                placeholder={I18n.translate('common.search')}/>
        </>
    );
};
