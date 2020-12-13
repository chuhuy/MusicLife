import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { fetchSearchResult } from '../../../api/explore';
import NotFound from '../../../assets/icons/not-found-song.svg';
import { Artist } from '../../../models/artist';
import { Playlist } from '../../../models/playlist';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { search } from '../../../redux/modules/search/actions';
import { LinkButton, NotFoundItem } from '../../../shared/components';
import { PlaylistList, SongList } from '../../../shared/components/flatlist';
import OnlineScreen from '../../../shared/components/online-screen';
import SearchBar from '../../../shared/components/search-bar';
import UnderlineTabBar from '../../../shared/components/underline-tab-bar';
import { styleVars } from '../../../shared/constance/style-variables';
import I18n from './../../../i18n';
import { AllTab, ArtistList } from './components';
import { styles } from './styles';

interface Props extends StateProps, DispatchProps {
    navigation: any
}

const mapStateToProps = (state: any) => ({
    keyword: state.search.keyword,
    loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteKeyWord: () => dispatch(search('')),
        enableLoading: () => dispatch(enableLoading()),
        disableLoading: () => dispatch(disableLoading()),
    };
};

export const TYPE = {
    ALL: 0,
    SONG: 1,
    ALBUM: 2,
    PLAYLIST: 3,
    ARTIST: 4,
};

const Search: React.FunctionComponent<Props> = (props: Props) => {
    const {
        navigation,
        keyword,
        enableLoading,
        disableLoading,
        deleteKeyWord,
        loading,
    } = props;

    const [activeTab, setActiveTab] = useState<number>(0);

    const [resultSong, setResultSong] = useState<Array<Song>>([]);
    const [topSong, setTopSong] = useState<Array<Song>>([]);

    const [resultAlbum, setResultAlbum] = useState<Array<Playlist>>([]);
    const [topAlbum, setTopAlbum] = useState<Array<Playlist>>([]);

    const [resultArtist, setResultArtist] = useState<Array<Artist>>([]);
    const [topArtist, setTopArtist] = useState<Array<Artist>>([]);

    const [tabMenu, setTabMenu] = useState<Array<{
        title: string,
        type: number,
        onClick: (type: number) => void
    }>>([]);

    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (keyword !== '') {
            enableLoading();

            fetchSearchResult(keyword)
                .then((data) => {
                    let menu = [];
                    if (data) {
                        const {artists, songs, albums} = data;
                        if (artists.length || songs.length || albums.length) {
                            let totalTab = 0;

                            menu.push({
                                title: I18n.translate('search.all'),
                                type: totalTab,
                                onClick: handleOpenTab,
                            });

                            if (artists.length) {
                                ++totalTab;
                                setResultArtist(artists);
                                setTopArtist(artists.slice(0, 2));

                                menu.push({
                                    title: I18n.translate('search.artists'),
                                    type: totalTab,
                                    onClick: handleOpenTab,
                                });
                            }
                            console.log(songs)

                            if (songs.length) {
                                ++totalTab;
                                setResultSong(songs);
                                setTopSong(songs.slice(0, 2));

                                menu.push({
                                    title: I18n.translate('search.songs'),
                                    type: totalTab,
                                    onClick: handleOpenTab,
                                });
                            }

                            if (albums.length) {
                                ++totalTab;
                                setResultAlbum(albums);
                                setTopAlbum(albums.slice(0, 2));

                                menu.push({
                                    title: I18n.translate('search.albums'),
                                    type: totalTab,
                                    onClick: handleOpenTab,
                                });
                            }
                        }
                        setTabMenu(menu);
                        console.log(menu)
                    }
                    disableLoading();
                })
                .catch(err => {
                    console.log(err);
                    disableLoading();
                });
        }
    }, [keyword]);

    const handleOpenTab = (type: number) => {
        setActiveTab(type);
        scrollViewRef.current.scrollTo({
            x: (Dimensions.get('window').width - 30) * type,
            y: 0,
            animated: true,
        });
    };

    const handleBack = () => {
        if (keyword) {
            deleteKeyWord();
        }

        navigation.goBack();
    };

    const handleScrollTab = (event: any) => {
        let index = Math.floor(
          event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 30),
        );
        setActiveTab(index);
        console.log(index)
    };

    return (
        <>
            <OnlineScreen>
                <View style={styles.header}>
                    <SearchBar size='"big' />

                    <View style={{marginHorizontal: -10}}>
                        <LinkButton
                            title={I18n.translate('search.cancel')}
                            onClick={handleBack}
                            color={styleVars.secondaryColor}
                        />
                    </View>
                </View>

                {loading ? null : (
                    <>
                        {tabMenu.length ? (
                            <>
                                <UnderlineTabBar options={tabMenu} activeTab={activeTab}/>

                                <ScrollView
                                    ref={scrollViewRef}
                                    contentContainerStyle={styles.bodyContainer}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollEnd={handleScrollTab}
                                >
                                    <ScrollView style={styles.body}>
                                        <AllTab
                                            song={topSong}
                                            album={topAlbum}
                                            artist={topArtist}
                                            chooseType={handleOpenTab}
                                        />
                                    </ScrollView>
                                    

                                    {resultArtist.length ? (
                                    <View style={{paddingHorizontal: 15}}>
                                        <View style={styles.body}>
                                            <ArtistList
                                                artist={resultArtist}
                                                isHorizontal={false}
                                            />
                                        </View>
                                    </View>
                                        
                                    ) : null}

                                    {resultSong.length ? (
                                        <View style={styles.body}>
                                            <SongList songs={resultSong} />
                                        </View>
                                    ) : null}

                                    {resultAlbum.length ? (
                                        <View style={styles.body}>
                                            <PlaylistList playlist={resultAlbum} />
                                        </View>
                                    ) : null}
                                </ScrollView>
                            </>
                        ) : (
                            <>
                                <NotFoundItem
                                    icon={<NotFound />}
                                    text={I18n.translate('search.not-found')}
                                />
                            </>
                        )}
                    </>
                )}
            </OnlineScreen>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
