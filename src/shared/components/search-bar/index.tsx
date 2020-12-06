/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { styleVars } from './../../constance/style-variables';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screen } from '../../constance/screen';
import { search } from '../../../redux/modules/search/actions';
import { connect } from 'react-redux';
import CloseSearch from '../../../assets/icons/close-search.svg';
import { Value } from 'react-native-reanimated';
import { IconButton } from '../icon-button';

interface Props extends StateProps, DispatchProps {
    size?: string
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        search: (keyword: string) => dispatch(search(keyword))
    };
};
const mapStateToProps = (state: any) => ({
    keyword: state.search.keyword,
});

const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const {size, keyword, search} = props;
    const route = useRoute();

    const [currentKeyword, setCurrentKeyword] = useState<string>(keyword);
    
    const handleSearch = () => {
        search(currentKeyword);

        if (route.name !== Screen.Common.Search && currentKeyword){
            navigation.navigate(Screen.Common.Search)
        }
    }

    const handleCloseSearch = () => {
        if (keyword !== '') {
            search('');
        }
        setCurrentKeyword('');

        if (route.name === Screen.Common.Search) {
            navigation.goBack();
        }
    }

    const handleChange = (value) => {
        setCurrentKeyword(value);
    }
    
    return (
        <>
            <View style={[styles.container, size && styles.bigContainer]}>
                <TextInput
                    style={styles.input}
                    value={currentKeyword}
                    onChangeText={handleChange}
                    placeholderTextColor={styleVars.greyColor}
                    placeholder={I18n.translate('common.search')}
                    onSubmitEditing={handleSearch}
                    numberOfLines={1}
                />
                {currentKeyword.length ? (
                    <View style={{paddingRight: 5}}>
                        <IconButton icon={CloseSearch} onClick={handleCloseSearch}/>
                    </View>
                ) : null}
            </View>
            
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
