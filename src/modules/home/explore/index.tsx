/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { MusicChartItem, SongItem, SectionTitle, PlaylistItem, GenreItem } from './components';
import { SearchBar } from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';
import Controller from '../controller';
import { connect } from 'react-redux';
import NotificationIcon from './../../../assets/icons/notification-active.svg';
import { playlist } from './../../../data/playlist';
import { songs } from './../../../data/song';
import { genre } from './../../../data/genre';
import { SKIP, PLAY, PAUSE } from './../../../redux/modules/player/actions';
import { Song } from '../../../models/song';
import { Playlist } from '../../../models/playlist';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { insertNotification } from '../../../shared/helper/sqlite';
import { Notification } from '../../../models/notification';


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

    const handleUserProfile = () => {
        navigation.navigate('Setting');
    };

    const handlePlayMusic = (song: any) => {
        const formattedSong: Song = {
            id: song.id,
            title: song.title,
            image_url: song.image_url,
            artist: song.artists[0].name,
            url: song.url,
        };
        props.saveSongToStore(formattedSong);
        const track = {
            id: song.id,
            url: song.url,
            title: song.title,
            artist: song.artists[0].name,
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
                .catch(() => props.pauseMusic())
            })
            .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic())})
        })
        .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic())});
        navigation.navigate('Player');
    };

    const handleOpenPlaylist = (value: any) => {
        const newPlaylist: Playlist = {
            id: value.playlist_id,
            name: value.name,
            image_url: value.image_url,
        };
        navigation.navigate('Playlist', {newPlaylist});
    };
    const handleNotification = () => {
        // navigation.navigate('Notification');
        const time = new Date(Date.now());
        const newNotification: Notification = {
            title: 'remoteMessage.notification.title',
            body: 'remoteMessage.notification.body',
            image_url: 'remoteMessage.notification.android.imageUrl',
            created_at: time.toString(),
        };
        console.log(newNotification);
        insertNotification(newNotification);
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    delayPressOut={0}
                    onPressOut={() => handleNotification()}>
                    <NotificationIcon />
                </TouchableOpacity>
                <SearchBar/>
                <TouchableOpacity
                    style={styles.userButton}
                    onPressOut={() => handleUserProfile()}>
                    <UserIcon />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.chart}>
                    <View style={styles.chartTitle}>
                        <TouchableOpacity
                            style={styles.chartButton}
                            activeOpacity={1}
                            onPressIn={() => {setTop100(false);}}>
                            <Text style={isTop100 ? styles.chartTitleInactive : styles.chartTitleActive}>{I18n.translate('explore.chart')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => {setTop100(true);}}>
                            <Text style={isTop100 ? styles.chartTitleActive : styles.chartTitleInactive}>{I18n.translate('explore.top100')}</Text>
                        </TouchableOpacity>
                    </View>
                    {isTop100 ?
                    <FlatList
                        horizontal={true}
                        data={playlist}
                        renderItem={({item}) => (<MusicChartItem title={item.name} image={item.image_url} onClick={() => {}}/>)}
                        keyExtractor={item => item.playlist_id.toString()}
                    />
                    : <FlatList
                        horizontal={true}
                        data={chartDummyData}
                        renderItem={({item}) => (<MusicChartItem title={item.title} image={item.image} onClick={() => {}}/>)}
                        keyExtractor={item => item.id.toString()}
                    />}
                </View>
                <View style={styles.latestSong}>
                    <SectionTitle title={I18n.translate('explore.latest-song')} onClick={() => {}} />
                    <FlatList
                        horizontal={true}
                        data={songs}
                        renderItem={({index}) => {
                            if (index % 2 === 0) {return (
                                <View style={styles.multipleRow}>
                                    <SongItem name={songs[index].title} artist={songs[index].artists[0].name} image={songs[index].image_url} onClick={() => handlePlayMusic(songs[index])}/>
                                    <SongItem name={songs[index + 1].title} artist={songs[index + 1].artists[0].name} image={songs[index + 1].image_url} onClick={() => handlePlayMusic(songs[index + 1])}/>
                                </View>
                            );}
                            else {return (<></>);}
                        }}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                <View style={styles.latestPlaylist}>
                    <View style={styles.latestPlaylistTitle}>
                        <SectionTitle title={I18n.translate('explore.latest-playlist')} onClick={() => {}} />
                    </View>
                    <FlatList
                        horizontal={true}
                        data={playlist}
                        renderItem={({item}) => (<PlaylistItem title={item.name} image={item.image_url} onClick={() => handleOpenPlaylist(item)}/>)}
                        keyExtractor={item => item.playlist_id.toString()}
                    />
                </View>
                <View style={styles.latestGenre}>
                    <SectionTitle title={I18n.translate('explore.genre')} onClick={() => {}} />
                    <FlatList
                        horizontal={true}
                        data={genre}
                        renderItem={({index}) => {
                            if (index % 2 === 0) {return (
                                <View style={styles.multipleRow}>
                                    <GenreItem title={genre[index].name} image={genre[index].image_url} onClick={() => {}}/>
                                    <GenreItem title={genre[index + 1].name} image={genre[index + 1].image_url} onClick={() => {}}/>
                                </View>
                            );}
                            else {return (<></>);}
                        }}
                        keyExtractor={item => item.genre_id.toString()}
                    />
                </View>
            </ScrollView>
            <Controller />
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

const chartDummyData = [
    {
        id: 1,
        image: 'https://avatar-nct.nixcdn.com/topic/share/2017/12/06/9/4/b/b/1512556174027.jpg',
        title: 'V-pop',
    },
    {
        id: 2,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        title: 'K-pop',
    },
    {
        id: 3,
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/2/9/d/029d613e30bbd38670e75b78b977257d.jpg',
        title: 'US-UK',
    },
];
