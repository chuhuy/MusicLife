import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchSearchResult } from '../../../api/explore';
import { Artist } from '../../../models/artist';
import { Playlist } from '../../../models/playlist';
import { Song } from '../../../models/song';
import { BaseScreen, LinkButton, LoadingLayer } from '../../../shared/components';
import { PlaylistList, SongList } from '../../../shared/components/flatlist';
import UnderlineTabBar from '../../../shared/components/underline-tab-bar';
import { styleVars } from '../../../shared/constance/style-variables';
import I18n from './../../../i18n';
import { AllTab, ArtistList } from './components';
import { styles } from './styles';
import { NotFoundItem } from '../../../shared/components';
import NotFound from '../../../assets/icons/not-found-song.svg';
import { connect } from 'react-redux';
import SearchBar from '../../../shared/components/search-bar';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { search } from '../../../redux/modules/search/actions';

interface Props extends StateProps, DispatchProps {
    navigation: any
}

const mapStateToProps = (state: any) => ({
    keyword: state.search.keyword,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteKeyWord: () => dispatch(search('')),
        enableLoading: () => dispatch(enableLoading()),
        disableLoading: () => dispatch(disableLoading()),
    };
};

export const TYPE = {
    ALL: 'ALL',
    SONG: 'SONG',
    ALBUM: 'ALBUM',
    PLAYLIST: 'PLAYLIST',
    ARTIST: 'ARTIST',
};

const Search: React.FunctionComponent<Props> = (props: Props) => {
    const {
        navigation,
        keyword,
        enableLoading,
        disableLoading,
        deleteKeyWord,
    } = props;

    const [activeTab, setActiveTab] = useState<string>(TYPE.ALL);

    const [resultSong, setResultSong] = useState<Array<Song>>([]);
    const [topSong, setTopSong] = useState<Array<Song>>([]);

    const [resultAlbum, setResultAlbum] = useState<Array<Playlist>>([]);
    const [topAlbum, setTopAlbum] = useState<Array<Playlist>>([]);

    const [resultArtist, setResultArtist] = useState<Array<Artist>>([]);
    const [topArtist, setTopArtist] = useState<Array<Artist>>([]);

    const [tabMenu, setTabMenu] = useState<Array<{
        title: string,
        type: string,
        onClick: (type: string) => void
    }>>([]);

    useEffect(() => {
        enableLoading();

        fetchSearchResult(keyword)
            .then((data) => {
                let menu = [];

                if (data) {
                    const {artists, songs, albums} = data;

                    menu.push({
                        title: I18n.translate('search.all'),
                        type: TYPE.ALL,
                        onClick: handleOpenTab,
                    });

                    if (artists.length) {
                        setResultArtist(artists);
                        setTopArtist(artists.slice(0, 2));

                        menu.push({
                            title: I18n.translate('search.artists'),
                            type: TYPE.ARTIST,
                            onClick: handleOpenTab,
                        });
                    }

                    if (songs.length) {
                        setResultSong(songs);
                        setTopSong(songs.slice(0, 2));

                        menu.push({
                            title: I18n.translate('search.songs'),
                            type: TYPE.SONG,
                            onClick: handleOpenTab,
                        });
                    }

                    if (albums.length) {
                        setResultAlbum(albums);
                        setTopAlbum(albums.slice(0, 2));

                        menu.push({
                            title: I18n.translate('search.albums'),
                            type: TYPE.ALBUM,
                            onClick: handleOpenTab,
                        });
                    }

                    disableLoading();

                    if (menu !== tabMenu) {
                        setTabMenu(menu);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                disableLoading();
            });
    }, [keyword]);

    const handleOpenTab = (type: string) => {
        setActiveTab(type);
    };

    const handleBack = () => {
        if (keyword) {
            deleteKeyWord();
        }

        navigation.goBack();
    };

    return (
        <>
            <BaseScreen>
                <View style={styles.header}>
                    <SearchBar size='"big' />
                    <LinkButton
                        title={I18n.translate('search.cancel')}
                        onClick={handleBack}
                        color={styleVars.secondaryColor}
                    />
                </View>

                {tabMenu.length ? (
                    <>
                        <UnderlineTabBar options={tabMenu} activeTab={activeTab}/>

                        {activeTab === TYPE.ALL && (
                            <ScrollView style={styles.body}>
                                <AllTab
                                    song={topSong}
                                    album={topAlbum}
                                    artist={topArtist}
                                    chooseType={handleOpenTab}
                                />
                            </ScrollView>
                        )}

                        {activeTab === TYPE.SONG && (
                            <View style={styles.body}>
                                <SongList songs={resultSong} />
                            </View>
                        )}

                        {activeTab === TYPE.ALBUM && (
                            <View style={styles.body}>
                                <PlaylistList playlist={resultAlbum} />
                            </View>
                        )}

                        {activeTab === TYPE.ARTIST && (
                            <View style={styles.body}>
                                <ArtistList
                                    artist={resultArtist}
                                    isHorizontal={false}
                                />
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <NotFoundItem
                            icon={<NotFound />}
                            text={I18n.translate('search.not-found')}
                        />
                    </>
                )}
            </BaseScreen>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
