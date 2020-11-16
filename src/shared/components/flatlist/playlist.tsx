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
    children?: any
}

const PlaylistList: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, isHorizontal = false, size, playlist, isAlbum = false, children} = props;

    const handleAlbum = (album) => {
        navigation.navigate('Playlist', {newPlaylist: album, isAlbum});
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const getFlatListContainerStyle = () => {
        if (size === 2) 
            return styles.flexFlatlist;
        
        return styles.flatlist;
    }

    const renderItem = (item: Playlist) => {
        return (
            isHorizontal || size ? 
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
            !isHorizontal ? 
                <ScrollView 
                    contentContainerStyle={getFlatListContainerStyle()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {playlist.map((item) => renderItem(item))}
                    {children}
                </ScrollView> 
                : <FlatList 
                    contentContainerStyle={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={playlist}
                    horizontal={isHorizontal}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={children}
                />
            }
        </>
    )
}

export default PlaylistList;

const styles = StyleSheet.create({
    flexFlatlist: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: -15,
    },
    flatlist: {
        marginHorizontal: -10
    }
})