import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import I18n from './../../../i18n';
import { MusicChartItem, SongItem, SectionTitle, PlaylistItem, GenreItem } from './components';
import { SearchBar } from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';

interface Props {
    navigation: any
}

export const Explore: React.FunctionComponent<Props> = (props: Props) => {

    const [isTop100, setTop100] = useState<boolean>(false);

    const handleUserProfile = () => {
        console.log('User profile');
    };

    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };

    return (
        <>
            <View style={styles.header}>
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
                        data={top100DummyData}
                        renderItem={({item}) => (<MusicChartItem title={item.title} image={item.image} onClick={() => {}}/>)}
                        keyExtractor={item => item.id.toString()}
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
                        data={latestSongDummyData}
                        renderItem={({index}) => {
                            if (index % 2 === 0) {return (
                                <View style={styles.multipleRow}>
                                    <SongItem name={latestSongDummyData[index].name} artist={latestSongDummyData[index].artist} image={latestSongDummyData[index].image} onClick={() => handlePlayMusic()}/>
                                    <SongItem name={latestSongDummyData[index + 1].name} artist={latestSongDummyData[index + 1].artist} image={latestSongDummyData[index + 1].image} onClick={() => handlePlayMusic()}/>
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
                        data={playlistDummyData}
                        renderItem={({item}) => (<PlaylistItem title={item.title} image={item.image} onClick={() => {}}/>)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                <View style={styles.latestGenre}>
                    <SectionTitle title={I18n.translate('explore.latest-song')} onClick={() => {}} />
                    <FlatList
                        horizontal={true}
                        data={genreDummyData}
                        renderItem={({index}) => {
                            if (index % 2 === 0) {return (
                                <View style={styles.multipleRow}>
                                    <GenreItem title={genreDummyData[index].title} image={genreDummyData[index].image} onClick={() => {}}/>
                                    <GenreItem title={genreDummyData[index + 1].title} image={genreDummyData[index + 1].image} onClick={() => {}}/>
                                </View>
                            );}
                            else {return (<></>);}
                        }}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
        </>
    );
};

const genreDummyData = [
    {
        id: 1,
        title: 'Genre 1',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 2,
        title: 'Genre 2',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 3,
        title: 'Genre 3',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 4,
        title: 'Genre 4',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
];

const playlistDummyData = [
    {
        id: 1,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Playlist 1',
    },
    {
        id: 2,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Playlist 2',
    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Playlist 3',
    },
    {
        id: 4,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Playlist 4',
    },
    {
        id: 5,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Playlist 5',
    },
];

const latestSongDummyData = [
    {
        id: 1,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        name: 'Anh đâu đấy',
        artist: 'Huy Chu',
    },
    {
        id: 2,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        name: 'Anh đâu đấy',
        artist: 'Huy Chu',
    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        name: 'Anh đâu đấy',
        artist: 'Huy Chu',
    },
    {
        id: 4,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        name: 'Anh đâu đấy',
        artist: 'Huy Chu',
    },
];

const chartDummyData = [
    {
        id: 1,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'V-pop',
    },
    {
        id: 2,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'K-pop',
    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'US-UK',
    },
];

const top100DummyData = [
    {
        id: 1,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Top 100 Nhạc Trẻ',
    },
    {
        id: 2,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Top 100 EDM',
    },
    {
        id: 3,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Top 100 Kpop',
    },
    {
        id: 4,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        title: 'Top 100 USUK',
    },
];
