import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import { Playlist } from '../../../models/playlist';
import { Screen } from '../../constance/screen';
import {Item} from './item'
import { SquareItem } from './square-item';

interface Props {
    navigation: any,
    playlist: Array<Playlist>,
    isAlbum?: boolean,
    children?: any,
    isHorizontal?: boolean,
    numsColumn?: number,
    disableScroll?: boolean
}

const PlaylistList: React.FunctionComponent<Props> = (props: Props) => {
    const {
        navigation, 
        playlist,
        children, 
        numsColumn,
        disableScroll = false, 
        isHorizontal = false, 
        isAlbum = false
    } = props;

    const handlePlaylist = (album) => {
        navigation.navigate(Screen.Common.PlaylistDetail, {newPlaylist: album, isAlbum});
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const renderItem = (item: Playlist) => {
        return (
            isHorizontal || numsColumn ? 
                <SquareItem 
                    key={item.id}
                    name={item.name}
                    image={item.image_url}
                    artist={item.artist}
                    onClick={() => handlePlaylist(item)}
                    size={numsColumn}
                /> :
                <Item 
                    key={item.id}
                    name={item.name}
                    image={item.image_url}
                    artist={item.artist}
                    onClick={() => handlePlaylist(item)}
                    onOptionClick={handleOpenOption}
                />
        )
    };
    
    return (
        <>
        {disableScroll ? 
            <View style={styles.flatlist}> 
                {playlist.map(item => renderItem(item))}
                {children}
            </View>
        : <FlatList 
            contentContainerStyle={[styles.flatlist, numsColumn && styles.flexFlatlist, isHorizontal && styles.horizontalList]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            
            numColumns={numsColumn}
            initialNumToRender={numsColumn}
            columnWrapperStyle={numsColumn && styles.columnWrapper}
            
            data={playlist}
            horizontal={isHorizontal}
            renderItem={(({item}) => renderItem(item))}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={children}
        />
        }
        </>
    )
}

export default PlaylistList;

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
    },
    horizontalList: {
        marginHorizontal: -10
    },
    flexFlatlist: {
        marginTop: -15,
        marginHorizontal: -10
    },
    columnWrapper: {
        paddingVertical: 15
    }
})