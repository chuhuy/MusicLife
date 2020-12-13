/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import CloseSearch from '../../../assets/icons/close-search.svg';
import { search } from '../../../redux/modules/search/actions';
import { Screen } from '../../constance/screen';
import { IconButton } from '../icon-button';
import I18n from './../../../i18n';
import { styleVars } from './../../constance/style-variables';
import { styles } from './styles';

interface Props extends StateProps, DispatchProps {
    size?: string
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchWord: (keyword: string) => dispatch(search(keyword)),
    };
};
const mapStateToProps = (state: any) => ({
    keyword: state.search.keyword,
});

const SearchBar: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const {
        size,
        keyword,
        searchWord,
    } = props;
    const route = useRoute();

    const [currentKeyword, setCurrentKeyword] = useState<string>(keyword);

    useEffect(() => {
        setCurrentKeyword(keyword);
    }, [keyword]);

    const handleSearch = () => {
        if (currentKeyword !== '') {
            searchWord(currentKeyword);

            if (route.name !== Screen.Common.Search) {
                navigation.navigate(Screen.Common.Search);
            }
        }
    };

    const deleteKeyWord = () => {
        if (currentKeyword !== '') {
            setCurrentKeyword('');
        }
    };

    const handleChange = (value) => {
        setCurrentKeyword(value);
    };

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
                        <IconButton icon={CloseSearch} onClick={deleteKeyWord}/>
                    </View>
                ) : null}
            </View>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
