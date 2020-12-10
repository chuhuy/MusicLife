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
import { fetchAlbumDetail, fetchMusicChart, fetchTop100 } from '../../../api/explore';
import ModalBottom from '../../../shared/components/modal-bottom';
import AlbumPlaylistOptions from '../../../shared/components/option-list/AlbumPlaylistOptions';
import { playSong } from '../../../shared/helper/player';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { connect } from 'react-redux';

interface Props extends DispatchProps {
    navigation: any;
    route: any;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      enableLoading: () => dispatch(enableLoading()),
      disableLoading: () => dispatch(disableLoading()),
    };
};

const PlaylistDetailScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {
        route,
        enableLoading,
        disableLoading,
    } = props;
    const { playlist, isChart, isAlbum, isTop100 } = route.params;
    const { album_id, title, artists, image_url } = playlist;

    const [songList, setSongList] = useState<Array<Song>>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        enableLoading();
        
        if (!isChart) {
            if (isAlbum) {
                fetchAlbumDetail(album_id)
                    .then((data) => {
                        setSongList(data.songs);
                        disableLoading();
                    }).catch((err) => console.log(err));
            } else if (isTop100) {
                fetchTop100(album_id)
                    .then((data) => {
                        setSongList(data.songs);
                        disableLoading();
                    }).catch((err) => console.log(err));
            } else {
                // Personal playlist
            }
        } else {
            fetchMusicChart(album_id)
                .then((data) => {
                    setSongList(data.songs);
                    disableLoading();
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const handleOptionClick = () => {
        setIsVisible(true);
    };
    const handleHeartClick = () => {
        console.log('Heart Click');
    };

    const handlePlay = () => {
        playSong(songList);
        console.log('play album');
    };

    const closeModal = () => {
        setIsVisible(!isVisible);
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
                                {songList.length ? (
                                    <View style={[styles.button, styles.playButton]}>
                                        <IconButton icon={Play} onClick={handlePlay}/>
                                    </View>
                                ) : null}

                                {isAlbum && (
                                    <View style={styles.button}>
                                        <IconButton icon={Heart} onClick={handleHeartClick} />
                                    </View>
                                )}

                                <View style={styles.button}>
                                    <IconButton icon={Option} onClick={handleOptionClick} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.sectionTwo}>
                    <SongList songs={songList} />
                </View>

                <ModalBottom
                    isVisible={isVisible}
                    onHide={() => setIsVisible(false)}
                    item={{image_url, artists, title}}>
                    <AlbumPlaylistOptions songs={songList} closeModal={closeModal}/>
                </ModalBottom>
                
                <Controller />
            </SafeAreaView>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(PlaylistDetailScreen);
