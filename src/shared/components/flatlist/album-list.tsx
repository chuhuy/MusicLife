import React from 'react';
import {FlatList} from 'react-native';
import {Item} from './item'

interface Props {
    navigation: any,
    albums: Array<{
        album_id: string,
        title: string,
        image_url: string,
    }>
}

const AlbumList: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, albums} = props;

    const handleAlbum = () => {
        navigation.navigate('Playlist');
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <FlatList 
                data={albums}
                renderItem={({item}) => {
                    // let artist = item.artists.reduce((s, artist) => s += `${artist.name}, `, '');
                    // artist = artist.substr(0, artist.length - 3);
                    
                    return (
                        <Item 
                            title={item.title}
                            image={item.image_url}
                            // artist={artist}
                            onClick={handleAlbum}
                            onOptionClick={handleOpenOption}
                        />
                    )
                }}
                keyExtractor={(item) => item.album_id.toString()}
            />
        </>
    )
}

export default AlbumList;