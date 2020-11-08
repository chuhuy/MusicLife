/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { styleVars } from './../../constance/style-variables';

interface Props {}

export const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TextInput
                style={styles.container}
                onChangeText={() => {}}
                placeholderTextColor={styleVars.greyColor}
                placeholder={I18n.translate('common.search')}/>
        </>
    );
};
