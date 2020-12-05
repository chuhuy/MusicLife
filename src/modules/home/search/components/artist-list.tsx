import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Artist } from '../../../../models/artist';
import { Screen } from '../../../../shared/constance/screen';
import ArtistItem from './artist-item';

interface ArtistListProps {
    isHorizontal?: boolean,
    artist: Array<Artist>,
}

export const ArtistList: React.FunctionComponent<ArtistListProps> = (props: ArtistListProps) => {
    const navigation = useNavigation();
    const {isHorizontal = true, artist} = props;

    const onChangeArtistScreen = (artist: Artist) => {
        navigation.navigate(Screen.Common.Singer, {artist});
    }

    const renderArtistItem = (item: Artist) => {
        return (
            <ArtistItem 
                key={item.artist_id}
                id={item.artist_id}
                name={item.name}
                image_url={item.image_url}
                onClick={() => onChangeArtistScreen(item)}
                isHorizontal={isHorizontal}
            /> 
        )
    }
    
    return (
        <>
            {
                isHorizontal ? 
                    <FlatList 
                        contentContainerStyle={styles.artistListHorizontal}
                        horizontal={isHorizontal}
                        data={artist}
                        renderItem={({item}) => renderArtistItem(item)}
                        keyExtractor={(item) => item.artist_id.toString()}
                    /> :
                    <ScrollView style={styles.artistListVertical} >
                        {artist.map((item) => renderArtistItem(item))}
                    </ScrollView>
            }
            
        </>
    )
}

const styles = StyleSheet.create({
    artistListHorizontal: {
        marginHorizontal: -10
    },
    artistListVertical: {
        marginVertical: -10,
    }
})
