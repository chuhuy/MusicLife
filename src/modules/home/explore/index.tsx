/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { SongItem, GenreItem } from './components';
import { SectionTitle } from '../../../shared/components';
import Controller from '../controller';
import { connect } from 'react-redux';
import { songs, genre, playlist, album } from './../../../data';
import { SKIP, PLAY, PAUSE } from './../../../redux/modules/player/actions';
import { Song } from '../../../models/song';
import { Playlist } from '../../../models/playlist';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import HeaderMainPage from '../../../shared/components/header-main-page';
import { PlaylistList } from '../../../shared/components/flatlist';
import { Screen } from '../../../shared/constance/screen';

interface Props extends DispatchProps, StateProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveSongToStore: (song: Song) => dispatch({type: SKIP, payload: song}),
        playMusic: () => dispatch({type: PLAY}),
        pauseMusic: () => dispatch({type: PAUSE}),
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

const Explore: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();

    const [isTop100, setTop100] = useState<boolean>(false);
    const [latestSong, setLatestSong] = useState<Array<Song>>(null);

    useEffect(() => {
        setLatestSong(songs.slice(0,4));
    }, [])

    const handlePlayMusic = (song: any) => {
        const formattedSong: Song = {
            id: song.id,
            title: song.title,
            image_url: song.image_url,
            artist: song.artist,
            url: song.url,
        };
        props.saveSongToStore(formattedSong);
        const track = {
            id: song.id,
            url: song.url,
            title: song.title,
            artist: song.artist,
            album: song.album || '',
            genre: song.genre || '',
            date: '2020-10-20T07:00:00+00:00',
            artwork: song.image_url,
        };

        TrackPlayer.reset()
        .then(() => {
            TrackPlayer.add(track)
            .then(() => {
                TrackPlayer.play()
                .then(() => props.playMusic())
                .catch(() => props.pauseMusic());
            })
            .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic());});
        })
        .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic());});
        navigation.navigate(Screen.Common.Player);
    };

    const handleLastestSong = () => {
        navigation.navigate(Screen.Explore.LatestSong, {songs})
    };

    const handleLatestAlbum = () => {
        navigation.navigate(Screen.Explore.Playlist, {
            isAlbum: true,
            playlist: album
        })
    };

    const handleGenreList = () => {
        navigation.navigate(Screen.Explore.GenreList, {genre})
    }

    const renderLatestSong = () => {
        return latestSong.map((item) => {
            return (
                <SongItem 
                    key={ item.id }
                    name={ item.title } 
                    artist={ item.artist } 
                    image={ item.image_url } 
                    onClick={ () => handlePlayMusic(item) }
                />
            )
        })
    }

    return (
        <>
            <SafeAreaView style={styles.view}>
                <View style={styles.container} >
                    <HeaderMainPage navigation={navigation} />

                    <ScrollView style={styles.contentContainer}>
                        <View style={styles.group}>
                            <View style={styles.chart}>
                                <Pressable
                                    style={styles.chartButton}
                                    onPressIn={() => {setTop100(false);}}>
                                    <Text style={isTop100 ? styles.chartTitleInactive : styles.chartTitleActive}>
                                        {I18n.translate('explore.chart')}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPressIn={() => {setTop100(true);}}>
                                    <Text style={isTop100 ? styles.chartTitleActive : styles.chartTitleInactive}>
                                        {I18n.translate('explore.top100')}
                                    </Text>
                                </Pressable>
                            </View>

                            {isTop100 ?
                            <PlaylistList 
                                navigation={navigation}
                                playlist={playlist}
                                isHorizontal={true}
                            />
                            : <PlaylistList 
                                navigation={navigation}
                                playlist={chartDummyData}
                                isHorizontal={true}
                            />}
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

                            <PlaylistList 
                                navigation={navigation}
                                playlist={album}
                                isHorizontal={true}
                            />
                        </View>

                        <View style={styles.group}>
                            <SectionTitle 
                                title={I18n.translate('explore.genre')} 
                                onClick={handleGenreList} 
                            />

                            <View style={styles.flatListContainer}>
                                {genre.map((item) => {
                                    return (
                                        <GenreItem 
                                            key={item.genre_id}
                                            title={item.name} 
                                            image={item.image_url} 
                                            onClick={() => {}}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Controller />
            </SafeAreaView>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

const chartDummyData = [
    {
        id: 1,
        image_url: 'https://avatar-nct.nixcdn.com/topic/share/2017/12/06/9/4/b/b/1512556174027.jpg',
        name: 'V-pop',
    },
    {
        id: 2,
        image_url: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        name: 'K-pop',
    },
    {
        id: 3,
        image_url: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/2/9/d/029d613e30bbd38670e75b78b977257d.jpg',
        name: 'US-UK',
    },
];
