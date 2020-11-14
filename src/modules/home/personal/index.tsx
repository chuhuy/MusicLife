/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';
import Controller from '../controller';
import AddPlaylistModal from './components/add-playlist-modal';
import HeaderMainPage from '../../../shared/components/header-main-page';
import Plus from '../../../assets/icons/plus.svg';
import NotFoundSong from '../../../assets/icons/not-found-song.svg';
import NotFoundAlbum from '../../../assets/icons/not-found-album.svg';
import NotFoundPlaylist from '../../../assets/icons/not-found-playlist.svg';
import NotFoundItem from './components/not-found-item';
import {songs} from '../../../data/song';
import {album} from '../../../data/album';
import {playlist} from '../../../data/playlist';
import {SongList, PlaylistList, AlbumList} from '../../../shared/components/flatlist';

interface Props {
    navigation: any,
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

const types = [
    {
        title: I18n.translate('personal.songs'),
        type: TYPE.SONG
    },
    {
        title: I18n.translate('personal.albums'),
        type: TYPE.ALBUM
    },
    {
        title: I18n.translate('personal.playlists'),
        type: TYPE.PLAYLIST
    },
];

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation} = props;
    const [addPlaylistModalVisibility, setAddPlaylistVisibility] = useState<boolean>(false);
    const [isShowAll, setShowAll] = useState(true);
    const [currentType, setType] = useState(TYPE.SONG);

    const handlePlayMusic = () => {
        navigation.navigate('Player');
    };
    const handleUserProfile = () => {
        navigation.navigate('Setting');
    };
    const handleNotification = () => {

    };
    const toggleAddPlaylistModal = () => {
        setAddPlaylistVisibility(!addPlaylistModalVisibility);
    }
    
    const renderSongTab = (songs) => {
        if (!songs.length)
            return (
                <NotFoundItem 
                    icon={<NotFoundSong />}
                    text={I18n.translate('personal.song-not-found')}
                />
            );
        
        return (
            <SongList
                navigation={navigation}
                songs={songs} 
            />
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
            <AlbumList 
                navigation={navigation}
                albums={album}
            />
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
            <PlaylistList 
                navigation={navigation}
                playlist={playlists}
            />
        );
    };

    return (
        <>
            <View style={styles.container}>
                <HeaderMainPage navigation={navigation} />

                <View style={styles.locationTitle}>
                    {
                        locations.map(({title, showAll}, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.locationButton}
                                    activeOpacity={1}
                                    delayPressIn={0}
                                    onPressIn={() => {setShowAll(showAll);}}>
                                    <Text style={
                                        isShowAll === showAll ? styles.locationTitleActive : styles.locationTitleInactive}>
                                        {title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={styles.typeTitle}>
                    {
                        types.map(({title, type}, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.typeButton}
                                    activeOpacity={1}
                                    delayPressIn={0}
                                    onPressIn={() => {setType(type);}}
                                >
                                    <Text style={type === currentType ? styles.typeTitleActive : styles.typeTitleInactive}>
                                        {title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
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
            </View>
            
            <AddPlaylistModal 
                isShow={addPlaylistModalVisibility} 
                onHide={() => setAddPlaylistVisibility(false)} 
            />
           
            <Controller />
        </>
    );
};
