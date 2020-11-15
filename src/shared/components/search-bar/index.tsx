/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { styleVars } from './../../constance/style-variables';
import { useRoute } from '@react-navigation/native';
import { Screen } from '../../constance/screen';

interface Props {
    navigation: any
}

export const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation} = props;
    const route = useRoute();
    console.log(navigation)
    const handleSearch = (event) => {
        if (route.name !== Screen.Search){
            navigation.navigate(Screen.Search)
        }
    }

    return (
        <>
            <TextInput
                style={styles.container}
                onChangeText={() => {}}
                placeholderTextColor={styleVars.greyColor}
                placeholder={I18n.translate('common.search')}
                onSubmitEditing={handleSearch}
            />
        </>
    );
};