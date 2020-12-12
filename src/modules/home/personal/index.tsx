/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchPersonalDetail, fetchPersonalPlaylist, fetchSongByPlaylist } from '../../../api/personal';
import NotFoundAlbum from '../../../assets/icons/not-found-album.svg';
import NotFoundPlaylist from '../../../assets/icons/not-found-playlist.svg';
import NotFoundSong from '../../../assets/icons/not-found-song.svg';
import Plus from '../../../assets/icons/plus.svg';
import { Playlist } from '../../../models/playlist';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { BaseScreen } from '../../../shared/components';
import { PlaylistList, SongList } from '../../../shared/components/flatlist';
import HeaderMainPage from '../../../shared/components/header-main-page';
import { notifyError, notifySuccess } from '../../../shared/components/notify';
import UnderlineTabBar from '../../../shared/components/underline-tab-bar';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';
import AddPlaylistModal from './components/add-playlist-modal';
import NotFoundItem from './components/not-found-item';
import { styles } from './styles';

interface Props extends StateProps, DispatchProps {}

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

const TYPE = {
    SONG: 'SONG',
    ALBUM: 'ALBUM',
    PLAYLIST: 'PLAYLIST',
};

const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const {
        access_token,
        enableLoading,
        disableLoading,
        loading,
    } = props;

    const [addPlaylistModalVisibility, setAddPlaylistVisibility] = useState<boolean>(false);
    const [currentType, setType] = useState(TYPE.SONG);
    const [songs, setSongs] = useState<Array<Song>>([]);
    const [albums, setAlbums] = useState<Array<Playlist>>([]);
    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        enableLoading();
        fetchPersonalDetail(access_token)
            .then((data) => {
                let {
                    personalSong,
                    personalPlaylist,
                    personalAlbum,
                } = data;

                setSongs(personalSong);

                personalPlaylist = personalPlaylist.map((playlist) => {
                    let image = '../../../assets/images/logo.png';
                    return {
                        ...playlist,
                        image_url: image,
                    };
                });

                setPlaylists(personalPlaylist);
                setAlbums(personalAlbum);

                disableLoading();
            })
            .catch((err) => {
                console.log(err);
                disableLoading();
            });
    }, []);

    const toggleAddPlaylistModal = () => {
        setAddPlaylistVisibility(!addPlaylistModalVisibility);
    };

    // Tab menu for type
    const handleOpenTab = (type: string) => {
        setType(type);
    };

    const typeMenu = [
        {
            title: I18n.translate('personal.songs'),
            type: TYPE.SONG,
            active: currentType === TYPE.SONG,
            onClick: handleOpenTab,
        },
        {
            title: I18n.translate('personal.albums'),
            type: TYPE.ALBUM,
            active: currentType === TYPE.ALBUM,
            onClick: handleOpenTab,
        },
        {
            title: I18n.translate('personal.playlists'),
            type: TYPE.PLAYLIST,
            active: currentType === TYPE.PLAYLIST,
            onClick: handleOpenTab,
        },
    ];

    const renderSongTab = () => {
        if (!songs.length) {
            return (
                <NotFoundItem
                    icon={<NotFoundSong />}
                    text={I18n.translate('personal.song-not-found')}
                />
            );
        }

        return (
            <SongList songs={songs} />
        );
    };

    const renderAlbumTab = () => {
        if (!albums.length) {
            return (
                <NotFoundItem
                    icon={<NotFoundAlbum />}
                    text={I18n.translate('personal.album-not-found')}
                />
            );
        }

        return (
            <PlaylistList playlist={albums}/>
        );
    };

    const renderPlaylistTab = () => {
        console.log(playlists)
        if (!playlists.length){
            return (
                <NotFoundItem
                    icon={<NotFoundPlaylist />}
                    text={I18n.translate('personal.playlist-not-found')}
                />
            );
        }

        return (
            <PlaylistList playlist={playlists}/>
        );
    };

    const getResult = (isError: boolean) => {
        console.log('get result')
        console.log(isError)
        if (!isError) {
            notifyError(I18n.translate('personal.create-playlist-fail'));
        } else {
            notifySuccess(I18n.translate('personal.create-playlist-success'));
            enableLoading();
            fetchPersonalPlaylist(access_token)
                .then((data) => {
                    console.log('add playlist');
                    console.log(data);
                    let personalPlaylist = data.personalPlaylist.map((playlist) => {
                        let image = '../../../assets/images/logo.png';
                        return {
                            ...playlist,
                            image_url: image,
                        };
                    });
                    
                    setPlaylists(personalPlaylist);
                    disableLoading();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <BaseScreen>
                <HeaderMainPage/>

                <UnderlineTabBar activeTab={currentType} options={typeMenu} />
                {!loading ? (
                    <>
                        <View style={styles.body}>
                            {currentType === TYPE.SONG && renderSongTab()}
                            {currentType === TYPE.ALBUM && renderAlbumTab()}
                            {currentType === TYPE.PLAYLIST &&
                            <>
                                <View style={styles.addBtnContainer}>
                                    <Button
                                        title={I18n.translate('personal.add-playlist')}
                                        onClick={toggleAddPlaylistModal}
                                        icon={<Plus width={18} height={18} />}
                                    />
                                </View>

                                {renderPlaylistTab()}
                            </>}
                        </View>

                        <AddPlaylistModal
                            access_token={access_token}
                            isShow={addPlaylistModalVisibility}
                            onHide={() => setAddPlaylistVisibility(false)}
                            getResult={getResult}
                        />
                    </>
                ) : null}
            </BaseScreen>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
