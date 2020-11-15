import React from 'react';
import {FlatList} from 'react-native';
import {Item} from './item'
import { SquareItem } from './square-item';

interface Props {
    navigation: any,
    isHorizontal?: boolean,
    playlist: Array<{
        id: number,
        artist?: string,
        name: string,
        image_url: string,
    }>,
    size?: number,
    isAlbum?: boolean,
}

const AlbumList: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, isHorizontal = false, size, playlist, isAlbum = false} = props;

    const handleAlbum = (album) => {
        navigation.navigate('Playlist', {newPlaylist: album, isAlbum});
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={playlist}
                horizontal={isHorizontal}
                renderItem={({item}) => {
                    return (
                        isHorizontal ? 
                            <SquareItem 
                                name={item.name}
                                image={item.image_url}
                                artist={item.artist}
                                onClick={() => handleAlbum(item)}
                                size={size}
                            /> :
                            <Item 
                                name={item.name}
                                image={item.image_url}
                                artist={item.artist}
                                onClick={() => handleAlbum(item)}
                                onOptionClick={handleOpenOption}
                            />
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    )
}

export default AlbumList;