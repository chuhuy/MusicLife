import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbumDetail, fetchMusicChart, fetchTop100 } from '../../../api/explore';
import { fetchIsFavoriteAlbum, postFavoriteAlbum } from '../../../api/personal';
import Play from '../../../assets/icons/play-red.svg';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { HeaderBack, IconButton } from '../../../shared/components';
import { SongList } from '../../../shared/components/flatlist';
import ModalBottom from '../../../shared/components/modal-bottom';
import AlbumPlaylistOptions from '../../../shared/components/option-list/AlbumPlaylistOptions';
import { playSong } from '../../../shared/helper/player';
import Controller from '../controller';
import Heart from './../../../assets/icons/heart.svg';
import HeartActive from './../../../assets/icons/heart-active.svg';
import Option from './../../../assets/icons/option.svg';
import { styles } from './styles';
import { notifyError, notifySuccess } from '../../../shared/components/notify';
import Toast from 'react-native-root-toast';
import I18n from '../../../i18n';

interface Props extends StateProps, DispatchProps {
    navigation: any;
    route: any;
}

const mapStateToProps = (state: any) => ({
    access_token: state.auth.access_token,
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
    } = props;
    const { playlist, isChart, isAlbum, isTop100 } = route.params;
    const { album_id, title, artists, image_url } = playlist;

    const [songList, setSongList] = useState<Array<Song>>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(true);
    console.log(access_token)
    useEffect(() => {
        enableLoading();

        if (!isChart) {
            if (isAlbum) {
                fetchAlbumDetail(album_id)
                    .then((data) => {
                        setSongList(data.songs);
                        disableLoading();
                        fetchIsFavoriteAlbum(access_token, album_id)
                            .then((res) => {
                                console.log(res)
                                if (!res.isFavoriteAlbum) {
                                    setIsFavorite(false);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
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
        if (!isFavorite) {
            postFavoriteAlbum(access_token, album_id)
                .then(() => {
                    notifySuccess(I18n.translate('common.add-favorite-success'), {position: Toast.positions.CENTER});
                })
                .catch((err) => {
                    console.log(err);
                    notifyError(I18n.translate('common.add-favorite-fail'), {position: Toast.positions.CENTER});
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
                                        <IconButton icon={isFavorite ? HeartActive : Heart} onClick={handleHeartClick} />
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

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(PlaylistDetailScreen);
