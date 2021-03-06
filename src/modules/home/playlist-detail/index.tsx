import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbumDetail, fetchMusicChart, fetchTop100 } from '../../../api/explore';
import { fetchIsFavoriteAlbum, fetchSongByPlaylist, postFavoriteAlbum } from '../../../api/personal';
import Play from '../../../assets/icons/play-red.svg';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { HeaderBack, IconButton, NotFoundItem } from '../../../shared/components';
import { SongList } from '../../../shared/components/flatlist';
import ModalBottom from '../../../shared/components/modal-bottom';
import AlbumPlaylistOptions from '../../../shared/components/option-list/AlbumPlaylistOptions';
import { playSong } from '../../../shared/helper/player';
import Controller from '../controller';
import Heart from './../../../assets/icons/heart.svg';
import HeartActive from './../../../assets/icons/heart-active.svg';
import Option from './../../../assets/icons/option.svg';
import { styles } from './styles';
import { notify } from '../../../shared/components/notify';
import Toast from 'react-native-root-toast';
import I18n from '../../../i18n';
import NotFoundSong from '../../../assets/icons/not-found-song.svg';
import { DEFAULT_IMAGE } from '../../../shared/constance/link';

interface Props extends StateProps, DispatchProps {
    navigation: any;
    route: any;
}

const mapStateToProps = (state: any) => ({
    access_token: state.auth.access_token,
    loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        enableLoading: () => dispatch(enableLoading()),
        disableLoading: () => dispatch(disableLoading()),
    };
};

const PlaylistDetailScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {
        route,
        access_token,
        enableLoading,
        disableLoading,
        loading,
    } = props;
    const { playlist, isChart, isAlbum, isTop100 } = route.params;
    const { album_id, title, artists, image_url } = playlist;

    const [songList, setSongList] = useState<Array<Song>>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(true);

    useEffect(() => {
        enableLoading();

        if (!isChart) {
            if (isAlbum) {
                fetchAlbumDetail(album_id)
                    .then((data) => {
                        setSongList(data.songs);

                        if (access_token) {
                            fetchIsFavoriteAlbum(access_token, album_id)
                                .then((res) => {
                                    if (!res.isFavoriteAlbum) {
                                        setIsFavorite(false);
                                    }
                                }).catch((err) => {
                                    disableLoading();
                                    console.log(err);
                                });
                        }
                        disableLoading();
                    })
                    .catch((err) => {
                        disableLoading();
                        console.log(err);
                    });
            } else if (isTop100) {
                fetchTop100(album_id)
                    .then((data) => {
                        setSongList(data.songs);
                        disableLoading();
                    })
                    .catch((err) => {
                        disableLoading();
                        console.log(err);
                    });
            } else {
                // Personal playlist
                console.log(access_token)
                fetchSongByPlaylist(access_token, album_id)
                    .then((data) => {
                        setSongList(data.songs);
                        disableLoading();
                    })
                    .catch((err) => {
                        disableLoading();
                        console.log(err);
                    });
            }
        } else {
            fetchMusicChart(album_id)
                .then((data) => {
                    setSongList(data.songs);
                    disableLoading();
                })
                .catch((err) => {
                    disableLoading();
                    console.log(err);
                });
        }
    }, []);

    const handleOptionClick = () => {
        setIsVisible(true);
    };
    const handleHeartClick = () => {
        if (!isFavorite) {
            postFavoriteAlbum(access_token, album_id)
                .then(() => {
                    notify(I18n.translate('common.add-favorite-success'), {position: Toast.positions.CENTER});
                })
                .catch((err) => {
                    console.log(err);
                    notify(I18n.translate('common.add-favorite-fail'), {position: Toast.positions.CENTER});
                });
        }
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
                <View style={styles.sectionOne}>
                    <ImageBackground source={{uri: image_url || DEFAULT_IMAGE}} blurRadius={3} style={styles.imageBg}/>

                    <View style={styles.blurLayer} />

                    <View style={styles.backContainer}>
                        <HeaderBack />
                    </View>

                    <View style={styles.sectionOneContent}>
                        <Image source={{ uri: image_url || DEFAULT_IMAGE }} style={styles.image} />

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

                                {isAlbum && access_token ? (
                                    <View style={styles.button}>
                                        <IconButton icon={isFavorite ? HeartActive : Heart} onClick={handleHeartClick} />
                                    </View>
                                ) : null}

                                {(isAlbum || songList.length) ? (
                                    <View style={styles.button}>
                                        <IconButton icon={Option} onClick={handleOptionClick} />
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </View>

                </View>

                {!loading ? (
                    <>
                        {songList.length ? (
                            <>
                                <View style={styles.sectionTwo}>
                                    <SongList songs={songList} />
                                </View>

                                <ModalBottom
                                    isVisible={isVisible}
                                    onHide={() => setIsVisible(false)}
                                    item={{image_url, artists, title}}>
                                    <AlbumPlaylistOptions songs={songList} closeModal={closeModal}/>
                                </ModalBottom>
                            </>
                        ) : (
                            <NotFoundItem
                                text={I18n.translate('personal.song-not-found')}
                                icon={<NotFoundSong />}
                            />
                        )}
                    </>
                ) : null}

                <Controller />
            </SafeAreaView>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetailScreen);
