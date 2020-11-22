import React from 'react';
import { FlatList } from 'react-native';
import I18n from '../../../../i18n';
import { HeaderScreen } from '../../../../shared/components';
import { SquareItem } from '../../../../shared/components/flatlist/square-item';
import { Screen } from '../../../../shared/constance/screen';
import { styles } from './styles';

interface Props {
    navigation: any,
    route: any
}

const GenreListScreen: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation, route } = props;
    const { genre } = route.params;

    return (
        <>
            <HeaderScreen
                navigation={navigation}
                title={I18n.translate('explore.genre')}>
                <FlatList 
                    contentContainerStyle={styles.genreList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    
                    numColumns={2}
                    initialNumToRender={2}
                    columnWrapperStyle={styles.columnWrapper}
                    
                    data={genre}
                    renderItem={(({item}) => {
                        return (
                            <SquareItem 
                                name={item.name}
                                image={item.image_url}
                                onClick={() => navigation.navigate(Screen.Explore.GenreDetail, {genre: item})}
                                size={2}
                            />
                        )
                    })}
                    keyExtractor={(item) => item.genre_id.toString()}
                />
            </HeaderScreen>
        </>
    )
}

export default GenreListScreen;
