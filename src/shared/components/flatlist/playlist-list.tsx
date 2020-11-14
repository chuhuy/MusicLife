import React from 'react';
import {FlatList} from 'react-native';
import { Playlist } from '../../../models/playlist';
import {Item} from './item'

interface Props {
    navigation: any,
    playlist: Array<{
        playlist_id: string,
        name: string,
        image_url: string
    }>
}

const PlaylistList: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, playlist} = props;

    const handlePlaylist = (item: any) => {
        navigation.navigate('Playlist', );
        const newPlaylist: Playlist = {
            id: item.playlist_id,
            name: item.name,
            image_url: item.image_url,
        };
        
        navigation.navigate('Playlist', {newPlaylist});
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <FlatList 
                data={playlist}
                renderItem={({item}) => {
                    return (
                        <Item 
                            key={item.playlist_id}
                            title={item.name}
                            image={item.image_url}
                            onClick={() => handlePlaylist(item)}
                            onOptionClick={handleOpenOption}
                        />
                    )
                }}
                keyExtractor={(item) => item.playlist_id.toString()}
            />
        </>
    )
}

export default PlaylistList;