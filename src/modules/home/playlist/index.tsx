import React from 'react';
import { View, Image, ImageBackground, Text, FlatList } from 'react-native';
import { IconButton } from '../../../shared/components';
import { styles } from './styles';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';
import Heart from './../../../assets/icons/heart.svg';
import Option from './../../../assets/icons/option.svg';
import { SongItem } from './components';
import { songs } from './../../../data/song';
interface Props {
    navigation: any,
    route: any,
}

const PlaylistScreen: React.FunctionComponent<Props> = (props: Props) => {

    const { playlist } = props.route.params;
    const handleBack = () => {
        props.navigation.goBack();
    };
    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };
    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <View style={styles.container}>
                <ImageBackground style={styles.sectionOne} blurRadius={10} source={{uri: playlist.image_url || ''}}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowLeft} onClick={() => handleBack()}/>
                    </View>
                    <Image source={{uri: playlist.image_url || ''}} style={styles.image}/>
                    <View style={styles.control}>
                        <View style={styles.titleGroup}>
                            <Text style={styles.playlistName}>{playlist.name || ''}</Text>
                            {/* <Text style={styles.artist}>Artist</Text> */}
                        </View>
                        <View style={styles.buttonGroup}>
                            <View style={styles.button}>
                                <IconButton icon={Heart} onClick={() => {}}/>
                            </View>
                            <View style={styles.button}>
                                <IconButton icon={Option} onClick={() => {}}/>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.sectionTwo}>
                    <FlatList
                        data={songs}
                        renderItem={({item}) => (<SongItem title={item.title} artist={item.artists[0].name} image={item.image_url} onOptionClick={() => handleOpenOption()} onClick={() => handlePlayMusic()}/>)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        </>
    );
};

const playlistDummyData = [
    {
        id: 1,
        title: 'Song 1',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 2,
        title: 'Song 2',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 3,
        title: 'Song 3',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 4,
        title: 'Song 4',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 5,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 6,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 7,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 8,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 9,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
    {
        id: 10,
        title: 'Song 5',
        artist: 'Huy Chu',
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
    },
];

export default PlaylistScreen;
