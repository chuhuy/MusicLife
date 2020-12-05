/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { Song } from '../../../models/song';
import { BaseScreen, LoadingLayer, SectionTitle } from '../../../shared/components';
import { PlaylistList } from '../../../shared/components/flatlist';
import HeaderMainPage from '../../../shared/components/header-main-page';
import { Screen } from '../../../shared/constance/screen';
import { album, genre, playlist, songs } from './../../../data';
import I18n from './../../../i18n';
import { addSong, continueMusic, PAUSE, pauseMusic, PLAY, playMusic, SKIP, skipMusic } from './../../../redux/modules/player/actions';
import { GenreItem, SongItem } from './components';
import { styles } from './styles';
import { getLatestSongs } from '../../../api/explore';
import { Playlist } from '../../../models/playlist';
import { Genre } from '../../../models/genre';
import GenreSection from './components/genreSection';
import { playSong } from '../../../shared/helper/player';
import { chartDummyData } from '../../../data/chart';

interface Props extends DispatchProps, StateProps { }

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
        playMusic: (song: Song) => dispatch(playMusic([song])),
        pauseMusic: () => dispatch(pauseMusic()),
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

const Explore: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const {playMusic} = props;

    const [isTop100, setTop100] = useState<boolean>(false);
    const [latestSong, setLatestSong] = useState<Array<Song>>(null);
    const [latestAlbum, setLatestAlbum] = useState<Array<Playlist>>(null);
    const [genreList, setGenreList] = useState<Array<Genre>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getLatestSongs()
            .then((data) => {
                setLatestSong(data.latestSongs);
                setLatestAlbum(data.latestAlbums);
                setGenreList(data.genres);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    const handlePlayMusic = (song: Song) => {
        console.log('play music');
        try {
            playSong(song);
            playMusic(song);
            navigation.navigate(Screen.Common.Player);
        } catch (err) {
            console.log(err)
            TrackPlayer.pause().then(() => pauseMusic());
        }
    };

    const handleLastestSong = () => {
        navigation.navigate(Screen.Common.Song, {
            songs: latestSong,
            isLatest: true
        })
    };

    const handleLatestAlbum = () => {
        navigation.navigate(Screen.Common.Playlist, {
            isAlbum: true,
            isLatest: true,
            playlist: album
        })
    };

    const handleGenreList = () => {
        navigation.navigate(Screen.Explore.GenreList, { genre })
    }

    const renderLatestSong = () => {
        return latestSong.map((item) => {
            return (
                <SongItem
                    key={item.music_id}
                    name={item.title}
                    artist={item.artists}
                    image={item.image_url}
                    onClick={() => handlePlayMusic(item)}
                />
            )
        })
    }

    return (
        <>
            <BaseScreen isScroll={false}>
                <HeaderMainPage />

                <ScrollView style={styles.contentContainer}>
                    {isLoading ? (
                        <>
                            <LoadingLayer />
                        </>
                    ) : (
                        <>
                        <View style={styles.group}>
                            <View style={styles.chart}>
                                <Pressable onPress={() => { setTop100(false); }}>
                                    <View style={styles.touchArea}>
                                        <Text style={isTop100 ? styles.chartTitleInactive : styles.chartTitleActive}>
                                            {I18n.translate('explore.chart')}
                                        </Text>
                                    </View>
                                </Pressable>

                                <Pressable onPress={() => { setTop100(true); }}>
                                        <View style={styles.touchArea}>
                                            <Text style={isTop100 ? styles.chartTitleActive : styles.chartTitleInactive}>
                                                {I18n.translate('explore.top100')}
                                            </Text>
                                        </View>
                                </Pressable>
                            </View>

                            {isTop100 ?
                                <PlaylistList playlist={playlist} isHorizontal />
                                : <PlaylistList playlist={chartDummyData} isChart isHorizontal />
                            }
                        </View>

                        <View style={styles.group}>
                            <SectionTitle title={I18n.translate('explore.latest-song')} onClick={handleLastestSong} />

                            {latestSong && (
                                <View style={styles.flatListContainer}>
                                    {renderLatestSong()}
                                </View>
                            )}
                        </View>

                        <View style={styles.group}>
                            <SectionTitle title={I18n.translate('explore.latest-album')} onClick={handleLatestAlbum} />

                            <PlaylistList playlist={latestAlbum} isAlbum isHorizontal />
                        </View>

                        <View>
                            <SectionTitle
                                title={I18n.translate('explore.genre')}
                                onClick={handleGenreList}
                            />

                            <View style={styles.flatListContainer}>
                                <GenreSection genres={genreList} />
                            </View>
                        </View>
                        </>
                    )}  
                    
                </ScrollView>
            </BaseScreen>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
