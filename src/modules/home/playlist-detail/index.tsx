import React, {useEffect, useState} from 'react';
import { View, Image, ImageBackground, Text, SafeAreaView } from 'react-native';
import { HeaderBack, IconButton, LoadingLayer } from '../../../shared/components';
import { styles } from './styles';
import Heart from './../../../assets/icons/heart.svg';
import Option from './../../../assets/icons/option.svg';
import Play from '../../../assets/icons/play-red.svg';
import {SongList} from '../../../shared/components/flatlist';
import Controller from '../controller';
import { Song } from '../../../models/song';
import { fetchAlbumDetail } from '../../../api/explore';
import ModalBottom from '../../../shared/components/modal-bottom';
import AlbumPlaylistOptions from '../../../shared/components/option-list/AlbumPlaylistOptions';

interface Props {
    navigation: any;
    route: any;
}

const PlaylistScreen: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation, route } = props;
    const { newPlaylist, isChart, isAlbum } = route.params;
    const { album_id, title, artists, image_url } = newPlaylist;

    const [songList, setSongList] = useState<Array<Song>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        
        if (!isChart) {
            if (isAlbum) {
                fetchAlbumDetail(album_id)
                    .then((data) => {
                        setSongList(data.songsByAlbum);
                        setIsLoading(false);
                    }).catch((err) => console.log(err))
            } else {
                // Personal playlist
            }
        } else {

        }
    }, [])

    const handleOptionClick = () => {
        setIsVisible(true);
    };
    const handleHeartClick = () => {
        console.log('Heart Click');
    };
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.sectionOne}
                    blurRadius={5}
                    source={{uri: image_url || ''}}>

                    <View style={styles.blurLayer} />

                    <View style={styles.backContainer}>
                        <HeaderBack />
                    </View>

                    <View style={styles.sectionOneContent}>
                        <Image source={{ uri: image_url || '' }} style={styles.image} />

                        <View style={styles.control}>
                            <View style={styles.titleGroup}>
                                <Text style={styles.playlistName} numberOfLines={1}>
                                    {title || ''}
                                </Text>
                                {artists && (
                                    <Text style={styles.artist} numberOfLines={1}>
                                        {artists}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.buttonGroup}>
                                <View style={[styles.button, styles.playButton]}>
                                    <IconButton icon={Play} onClick={() => {}}/>
                                </View>
                                <View style={styles.button}>
                                    <IconButton icon={Heart} onClick={() => { }} />
                                </View>
                                <View style={styles.button}>
                                    <IconButton icon={Option} onClick={handleOptionClick} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.sectionTwo}>
                    {isLoading ? (
                        <LoadingLayer />
                    ) : (
                        <SongList songs={songList} />
                    )}
                </View>

                <Controller />
            </SafeAreaView>
            <ModalBottom
                isVisible={isVisible}
                onHide={() => setIsVisible(false)}
                item={{image_url, artists, title}}>
                <AlbumPlaylistOptions songs={songList}/>
            </ModalBottom>
        </>
    );
};

export default PlaylistScreen;
