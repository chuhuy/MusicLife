/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import NotFoundAlbum from '../../../assets/icons/not-found-album.svg';
import NotFoundPlaylist from '../../../assets/icons/not-found-playlist.svg';
import NotFoundSong from '../../../assets/icons/not-found-song.svg';
import Plus from '../../../assets/icons/plus.svg';
import { album } from '../../../data/album';
import { playlist } from '../../../data/playlist';
import { songs } from '../../../data/song';
import { BaseScreen } from '../../../shared/components';
import { AlbumList, PlaylistList, SongList } from '../../../shared/components/flatlist';
import HeaderMainPage from '../../../shared/components/header-main-page';
import UnderlineTabBar from '../../../shared/components/underline-tab-bar';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';
import AddPlaylistModal from './components/add-playlist-modal';
import NotFoundItem from './components/not-found-item';
import { styles } from './styles';

interface Props {
}

const TYPE = {
    SONG: 'SONG',
    ALBUM: 'ALBUM',
    PLAYLIST: 'PLAYLIST',
};

const locations = [
    {
        title: I18n.translate('personal.all'),
        showAll: true
    },
    {
        title: I18n.translate('personal.device'),
        showAll: false
    }
];

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const [addPlaylistModalVisibility, setAddPlaylistVisibility] = useState<boolean>(false);
    const [isShowAll, setShowAll] = useState(true);
    const [currentType, setType] = useState(TYPE.SONG);

    const toggleAddPlaylistModal = () => {
        setAddPlaylistVisibility(!addPlaylistModalVisibility);
    }
    
    // Tab menu for type
    const handleOpenTab = (type: string) => {
        setType(type);
    }

    const typeMenu = [
        {
            title: I18n.translate('personal.songs'),
            type: TYPE.SONG,
            active: currentType === TYPE.SONG,
            onClick: handleOpenTab
        },
        {
            title: I18n.translate('personal.albums'),
            type: TYPE.ALBUM,
            active: currentType === TYPE.ALBUM,
            onClick: handleOpenTab
        },
        {
            title: I18n.translate('personal.playlists'),
            type: TYPE.PLAYLIST,
            active: currentType === TYPE.PLAYLIST,
            onClick: handleOpenTab
        },
    ]

    const renderSongTab = (songs) => {
        if (!songs.length)
            return (
                <NotFoundItem 
                    icon={<NotFoundSong />}
                    text={I18n.translate('personal.song-not-found')}
                />
            );
        
        return (
            <SongList songs={songs} />
        )
    };

    const renderAlbumTab = (albums) => {
        if (!albums.length){
            return (
                <NotFoundItem 
                    icon={<NotFoundAlbum />}
                    text={I18n.translate('personal.album-not-found')}
                />
            );
        }

        return (
            <AlbumList playlist={album}/>
        );
    };

    const renderPlaylistTab = (playlists) => {
        if (!playlists.length){
            return (
                <NotFoundItem 
                    icon={<NotFoundPlaylist />}
                    text={I18n.translate('personal.playlist-not-found')}
                />
            )
        }
        return (
            <PlaylistList playlist={playlists}/>
        );
    };

    return (
        <>
            <BaseScreen>
                <HeaderMainPage/>

                <View style={styles.locationTitle}>
                    {locations.map(({title, showAll}, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={styles.locationButton}
                                onPressIn={() => {setShowAll(showAll);}}>
                                <Text style={
                                    isShowAll === showAll ? styles.locationTitleActive : styles.locationTitleInactive}>
                                    {title}
                                </Text>
                            </Pressable>
                        )
                    })}
                </View>

                {isShowAll ? 
                    <>
                        {/* Tab menu for type */}
                        <UnderlineTabBar options={typeMenu} />

                        <View style={styles.body}>
                            {currentType === TYPE.SONG && renderSongTab(songs)}
                            {currentType === TYPE.ALBUM && renderAlbumTab(album)}
                            {currentType === TYPE.PLAYLIST &&
                            <>
                                <View style={styles.addBtnContainer}>
                                    <Button 
                                        title={I18n.translate('personal.add-playlist')} 
                                        onClick={toggleAddPlaylistModal}
                                        icon={<Plus width={18} height={18} />}
                                    />
                                </View>

                                {renderPlaylistTab(playlist)}
                            </>}
                        </View>
                    </> : <View style={styles.body}>{renderSongTab(songs)}</View>
                }

                <AddPlaylistModal 
                    isShow={addPlaylistModalVisibility} 
                    onHide={() => setAddPlaylistVisibility(false)} 
                />
            </BaseScreen>
        </>
    );
};
