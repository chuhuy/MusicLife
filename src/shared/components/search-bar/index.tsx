/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
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
    const [keyword, setKeyword] = useState<string>(route.params ? route.params.keyword : '');
    
    const handleSearch = () => {
        if (route.name !== Screen.Common.Search && keyword){
            navigation.navigate(Screen.Common.Search, {
                keyword
            })
        }
    }

    const handleChange = (value) => {
        setKeyword(value)
    }
    
    return (
        <>
            <TextInput
                style={[styles.container, size && styles.bigContainer]}
                value={keyword}
                onChangeText={handleChange}
                placeholderTextColor={styleVars.greyColor}
                placeholder={I18n.translate('common.search')}
                onSubmitEditing={handleSearch}
            />
        </>
    );
};
