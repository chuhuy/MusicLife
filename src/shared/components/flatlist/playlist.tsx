import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import { Playlist } from '../../../models/playlist';
import {Item} from './item'
import { SquareItem } from './square-item';

interface Props {
    navigation: any,
    isHorizontal?: boolean,
    playlist: Array<Playlist>,
    size?: number,
    isAlbum?: boolean,
    disableScroll?: boolean
}

const PlaylistList: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, isHorizontal = false, disableScroll = false, size, playlist, isAlbum = false} = props;

    const handleAlbum = (album) => {
        navigation.navigate('Playlist', {newPlaylist: album, isAlbum});
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const renderItem = (item: Playlist) => {
        return (
            isHorizontal ? 
                <SquareItem 
                    key={item.id}
                    name={item.name}
                    image={item.image_url}
                    artist={item.artist}
                    onClick={() => handleAlbum(item)}
                    size={size}
                /> :
                <Item 
                    key={item.id}
                    name={item.name}
                    image={item.image_url}
                    artist={item.artist}
                    onClick={() => handleAlbum(item)}
                    onOptionClick={handleOpenOption}
                />
        )
    };

    return (
        <>
            {
            disableScroll ? 
                <ScrollView style={styles.flatListContainer}>
                    {playlist.map((item) => renderItem(item))}
                </ScrollView> 
                : <FlatList 
                    contentContainerStyle={!isHorizontal && styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    data={playlist}
                    horizontal={isHorizontal}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            }
        </>
    )
}

export default PlaylistList;

const styles = StyleSheet.create({
    flatListContainer: {
        margin: -7.5
    }
})