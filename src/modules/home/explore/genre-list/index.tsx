import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {fetchGenres} from '../../../../api/explore';
import {Genre} from '../../../../models/genre';
import {BaseScreen, LoadingLayer} from '../../../../shared/components';
import {SquareItem} from '../../../../shared/components/flatlist/square-item';
import {Screen} from '../../../../shared/constance/screen';
import {styles} from './styles';

interface Props {
  navigation: any;
}

const GenreListScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {navigation} = props;

  const [genres, setGenres] = useState<Array<Genre>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchGenres()
      .then((data) => {
        setIsLoading(false);
        setGenres(data.genres);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <BaseScreen>
        {isLoading ? (
          <LoadingLayer />
        ) : (
          <FlatList
            contentContainerStyle={styles.genreList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            initialNumToRender={2}
            columnWrapperStyle={styles.columnWrapper}
            data={genres}
            renderItem={({item}) => {
              return (
                <SquareItem
                  name={item.name}
                  image={item.image_url}
                  onClick={() =>
                    navigation.navigate(Screen.Explore.GenreDetail, {
                      genre: item,
                    })
                  }
                  size={2}
                />
              );
            }}
            keyExtractor={(item) => item.genre_id.toString()}
          />
        )}
      </BaseScreen>
    </>
  );
};

export default GenreListScreen;
