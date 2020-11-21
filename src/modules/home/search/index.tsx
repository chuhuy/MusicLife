import React, { useEffect, useState } from 'react';
import I18n from './../../../i18n';
import { SafeAreaView, View } from 'react-native';
import { LinkButton, SearchBar } from '../../../shared/components';
import UnderlineTabBar from '../../../shared/components/underline-tab-bar';
import { styleVars } from '../../../shared/constance/style-variables';
import { styles } from './styles';
import { AllTab, ArtistList } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import { artist, songs, playlist, album } from '../../../data';
import { Song } from '../../../models/song';
import { Playlist } from '../../../models/playlist';
import { Artist } from '../../../models/artist';
import { PlaylistList, SongList } from '../../../shared/components/flatlist';

interface Props {
    navigation: any
}

export const TYPE = {
    ALL: 'ALL',
    SONG: 'SONG',
    ALBUM: 'ALBUM',
    PLAYLIST: 'PLAYLIST',
    ARTIST: 'ARTIST'
};

const Search: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation} = props;
    const [activeTab, setActiveTab] = useState<string>(TYPE.ALL);

    const [resultSong, setResultSong] = useState<Array<Song>>(songs);
    const [topSong, setTopSong] = useState<Array<Song>>(songs.slice(0, 2));
    const [resultPlaylist, setResultPlaylist] = useState<Array<Playlist>>(playlist);
    const [topPlaylist, setTopPlaylist] = useState<Array<Playlist>>(playlist.slice(0, 2));
    const [resultAlbum, setResultAlbum] = useState<Array<Playlist>>(album);
    const [topAlbum, setTopAlbum] = useState<Array<Playlist>>(album.slice(0, 2));
    const [resultArtist, setResultArtist] = useState<Array<Artist>>(artist);
    const [topArtist, setTopArtist] = useState<Array<Artist>>(artist.slice(0, 2));

    useEffect(() => {
        setTopSong(resultSong.slice(0, 2));
    }, [resultSong])

    useEffect(() => {
        setTopPlaylist(resultPlaylist.slice(0, 2));
    }, [resultPlaylist])

    useEffect(() => {
        setTopAlbum(resultAlbum.slice(0, 2));
    }, [resultAlbum])

    useEffect(() => {
        setTopArtist(resultArtist.slice(0, 2));
    }, [resultArtist])

    const handleOpenTab = (type: string) => {
        setActiveTab(type);
    }
    
    const types = [
        {
            title: I18n.translate('search.all'),
            type: TYPE.ALL,
            active: activeTab === TYPE.ALL,
            onClick: handleOpenTab
        },
        {
            title: I18n.translate('search.artists'),
            type: TYPE.ARTIST,
            active: activeTab === TYPE.ARTIST,
            onClick: handleOpenTab
        },
        {
            title: I18n.translate('search.songs'),
            type: TYPE.SONG,
            active: activeTab === TYPE.SONG,
            onClick: handleOpenTab
        },
        {
            title: I18n.translate('search.albums'),
            type: TYPE.ALBUM,
            active: activeTab === TYPE.ALBUM,
            onClick: handleOpenTab
        },
    ]

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <>  
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <SearchBar size='big' />
                    <LinkButton 
                        title={I18n.translate('search.cancel')}
                        onClick={handleBack}
                        color={styleVars.secondaryColor}
                    />
                </View>
                
                <UnderlineTabBar options={types} />
                    
                {
                    activeTab === TYPE.ALL && 
                    <ScrollView style={styles.body}>
                        <AllTab 
                            navigation={navigation} 
                            playlist={topPlaylist}
                            song={topSong}
                            album={topAlbum}
                            artist={topArtist}
                            chooseType={handleOpenTab} 
                        />
                    </ScrollView>
                }
                {
                    activeTab === TYPE.SONG && 
                    <View style={styles.body}>
                        <SongList 
                            navigation={navigation} 
                            songs={resultSong}
                        />
                    </View>
                }
                {
                    (activeTab === TYPE.ALBUM) && 
                    <View style={styles.body}>
                        <PlaylistList 
                            navigation={navigation}
                            playlist={resultAlbum}
                        />
                    </View>
                }
                {
                    activeTab === TYPE.ARTIST && 
                    <View style={styles.body}>
                        <ArtistList 
                            navigation={navigation} 
                            artist={artist}
                            isHorizontal={false}
                        />
                    </View>
                }
            </SafeAreaView>
        </>
    )
}

export default Search;
