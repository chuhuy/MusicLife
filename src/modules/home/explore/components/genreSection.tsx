import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Genre} from '../../../../models/genre';
import {Screen} from '../../../../shared/constance/screen';
import {GenreItem} from './genre-item';

interface Props {
  genres: Array<Genre>;
}

const GenreSection: React.FC<Props> = (props: Props) => {
  const {genres} = props;
  const navigation = useNavigation();

  const handleGenreDetail = (genre: Genre) => {
    navigation.navigate(Screen.Explore.GenreDetail, {genre});
  };

  return (
    <>
      {genres &&
        genres.map((item) => {
          return (
            <GenreItem
              key={item.genre_id}
              title={item.name}
              image={item.image_url}
              onClick={() => handleGenreDetail(item)}
            />
          );
        })}
    </>
  );
};

export default GenreSection;
