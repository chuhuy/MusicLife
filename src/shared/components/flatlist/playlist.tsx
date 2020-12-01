import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Playlist} from '../../../models/playlist';
import {Screen} from '../../constance/screen';
import ModalBottom from '../modal-bottom';
import {AlbumPlayOptions} from '../option-list/AlbumPlaylistOptions';
import {Item} from './item';
import {SquareItem} from './square-item';

interface Props {
    playlist: Array<Playlist>;
    isAlbum?: boolean;
    children?: any;
    isHorizontal?: boolean;
    numsColumn?: number;
    disableScroll?: boolean;
}

const PlaylistList: React.FunctionComponent<Props> = (props: Props) => {
    const {
        playlist,
        children,
        numsColumn,
        disableScroll = false,
        isHorizontal = false,
        isAlbum = false,
    } = props;

    const navigation = useNavigation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [itemModal, setItemModal] = React.useState<any>(null);
    const handlePlaylist = (album) => {
        navigation.navigate(Screen.Common.PlaylistDetail, {
            newPlaylist: album,
            isAlbum,
        });
    };

    const handleOpenOption = (item) => {
        setIsVisible(true);
        setItemModal(item);
    };

    const renderItem = (item: Playlist) => {
        return isHorizontal || numsColumn ? (
            <SquareItem
                key={item.id}
                name={item.name}
                image={item.image_url}
                artist={item.artist}
                onClick={() => handlePlaylist(item)}
                size={numsColumn}
            />
        ) : (
            <Item
                key={item.id}
                name={item.name}
                image={item.image_url}
                artist={item.artist}
                onClick={() => handlePlaylist(item)}
                onOptionClick={() => handleOpenOption(item)}
            />
        );
    };
    //
    return (
        <>
            {disableScroll ? (
                <View style={styles.flatlist}>
                    {playlist.map((item) => renderItem(item))}
                    <View style={styles.flatListFooter}>{children}</View>
                </View>
            ) : (
                <>
                    <FlatList
                        contentContainerStyle={[
                            styles.flatlist,
                            (numsColumn || isHorizontal) &&
                                styles.horizontalList,
                        ]}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        //
                        numColumns={numsColumn}
                        initialNumToRender={numsColumn}
                        columnWrapperStyle={numsColumn && styles.columnWrapper}
                        //
                        data={playlist}
                        horizontal={isHorizontal}
                        renderItem={({item}) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={!isHorizontal && children}
                        ListFooterComponentStyle={
                            !isHorizontal && {...styles.flatListFooter}
                        }
                    />
                    {isHorizontal && (
                        <View
                            style={[
                                styles.flatListFooter,
                                styles.flatListHorizontalFooter,
                            ]}>
                            {children}
                        </View>
                    )}
                </>
            )}
            <ModalBottom
                isVisible={isVisible}
                item={itemModal}
                onHide={() => setIsVisible(false)}>
                <AlbumPlayOptions />
            </ModalBottom>
        </>
    );
};

export default PlaylistList;

const styles = StyleSheet.create({
    flatlist: {
        marginVertical: -10,
        justifyContent: 'center',
    },
    horizontalList: {
        marginHorizontal: -10,
        marginVertical: 0,
    },
    columnWrapper: {
        paddingVertical: 15,
    },
    flatListFooter: {
        flex: 1,
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    flatListHorizontalFooter: {
        marginTop: 10,
    },
});
