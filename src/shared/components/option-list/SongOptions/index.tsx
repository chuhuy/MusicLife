import React, { Fragment, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { fetchIsFavoriteSong, postFavoriteSong } from '../../../../api/personal';
import TrashIcon from '../../../../assets/icons/delete.svg';
import { Song } from '../../../../models/song';
import { addSongs, removeSongs } from '../../../helper/player';
import { notifyError, notifySuccess } from '../../notify';
import DownloadSvg from './../../../../assets/icons/download.svg';
import HeartSvg from './../../../../assets/icons/heart.svg';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import PlusSvg from './../../../../assets/icons/plus.svg';
import I18n from './../../../../i18n';
import { styles } from './styles';

interface Props extends StateProps {
    song: Song,
    closeModal: () => void,
}

const mapStateToProps = (state: any) => ({
    access_token: state.auth.access_token,
});

const SongOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {access_token, song, closeModal} = props;
    const [isAddPlaying, setIsAddPlaying] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(true);

    useEffect(() => {
        const handleAddedToPlaying = async () => {
            const currentTracks = await TrackPlayer.getQueue();
            let songIndex = currentTracks.findIndex(track => track.id === song.music_id.toString());

            if (songIndex !== -1) {
                setIsAddPlaying(true);
            }
        };

        handleAddedToPlaying();

        if (access_token) {
            fetchIsFavoriteSong(access_token, song.music_id)
              .then((data) => {
                if (!data.isFavoriteSong) {
                    setIsFavorite(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            }
    }, []);

    const handleNowPlayingPlaylist = async () => {
        if (isAddPlaying) {
            removeSongs(song);
            console.log(await TrackPlayer.getQueue())
        } else {
            addSongs([song]);
        }
        closeModal();
    };

    const handleAddToFavorite = () => {
        postFavoriteSong(access_token, song.music_id)
            .then(() => {
                notifySuccess(I18n.translate('common.add-favorite-success'), {position: Toast.positions.CENTER});
                setIsFavorite(true);
            })
            .catch(err => {
                console.log(err);
                notifyError(I18n.translate('common.add-favorite-fail'), {position: Toast.positions.CENTER});
            });
        console.log('Add to favorite');
    };
    const handleAddToPlaylist = () => {
        console.log('Add to playlist');
    };
    const handleDownload = () => {
        console.log('Download');
    };

    return (
        <>
            <Fragment>
                <Pressable
                    style={styles.optionItem}
                    onPress={handleNowPlayingPlaylist}>
                    <View style={styles.svg}>
                        {isAddPlaying ? (
                            <TrashIcon width={25} height={25} />
                        ) : (
                            <PlayListAddSvg width={25} height={25} />
                        )}
                    </View>
                    <Text style={styles.optionText}>
                        {isAddPlaying ? I18n.translate('optionModal.remove-to-now-playlist') : I18n.translate('optionModal.add-to-now-playlist')}
                    </Text>
                </Pressable>

                {!isFavorite ? (
                    <Pressable
                        style={styles.optionItem}
                        onPress={handleAddToFavorite}>
                        <View style={styles.svg}>
                            <HeartSvg width={25} height={25} />
                        </View>
                        <Text style={styles.optionText}>
                            {I18n.translate('optionModal.add-to-favorite')}
                        </Text>
                    </Pressable>
                ) : null}

                <Pressable
                    style={styles.optionItem}
                    onPress={handleAddToPlaylist}>
                    <View style={styles.svg}>
                        <PlusSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-playlist')}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPress={handleDownload}>
                    <View style={styles.svg}>
                        <DownloadSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.download')}
                    </Text>
                </Pressable>
            </Fragment>
        </>
    );
};

export default connect(mapStateToProps, null)(SongOptions);
type StateProps = ReturnType<typeof mapStateToProps>;
