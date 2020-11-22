import React from 'react';
import { styles } from './styles';
import I18n from '../../../../i18n';
import { FlatList, SafeAreaView, View } from 'react-native';
import { HeaderBack } from '../../../../shared/components';
import { SquareItem } from '../../../../shared/components/flatlist/square-item';

interface Props {
    navigation: any,
    route: any
}

const GenreListScreen: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation, route } = props;
    const { genre } = route.params;

    return (
        <>
            <SafeAreaView style={styles.view}>
                <HeaderBack 
                    navigation={navigation}
                    title={I18n.translate('explore.genre')}
                />

                <View style={styles.body}>
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
                                    onClick={() => {}}
                                    size={2}
                                />
                            )
                        })}
                        keyExtractor={(item) => item.genre_id.toString()}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default GenreListScreen;