/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { styleVars } from './../../constance/style-variables';
import { useRoute } from '@react-navigation/native';
import { Screen } from '../../constance/screen';

interface Props {
    navigation?: any,
    size?: string
}

export const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, size} = props;
    const route = useRoute();
    
    const handleSearch = (event) => {
        if (route.name !== Screen.Common.Search){
            navigation.navigate(Screen.Common.Search)
        }
    }
    
    return (
        <>
            <TextInput
                style={[styles.container, size && styles.bigContainer]}
                onChangeText={() => {}}
                placeholderTextColor={styleVars.greyColor}
                placeholder={I18n.translate('common.search')}
                onSubmitEditing={handleSearch}
            />
        </>
    );
};
