import React, { Fragment, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Song } from '../../../../models/song';
import { addSongs, playSong } from '../../../helper/player';
import DeleteSvg from './../../../../assets/icons/delete.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import PlaySvg from './../../../../assets/icons/play.svg';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import I18n from './../../../../i18n';
import { styles } from './styles';

interface Props {
    songs?: Array<Song>,
    album_id?: number,
    closeModal: () => void,
}

const AlbumPlayOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {
        songs,
        album_id,
        closeModal,
    } = props;
    const [songsNotAdd, setSongsNotAdd] = useState<Array<Song>>([]);

    useEffect(() => {
        const handleAddedToPlaying = async () => {
            const currentTracks = await TrackPlayer.getQueue();

            let notAddedSongs = songs.filter(song => {
                let isExist = false;
                for (let i = 0; i < currentTracks.length; i++) {
                    if (song.music_id.toString() === currentTracks[i].id) {
                        isExist = true;
                        break;
                    }
                }

                return !isExist;
            });

            if (notAddedSongs.length) {
                setSongsNotAdd(notAddedSongs);
            }
        };

        handleAddedToPlaying();
    }, []);

    const handleAddToNowPlayingPlaylist = () => {
        addSongs(songsNotAdd);
        closeModal();

        console.log('Add to now playing playlist');
    };
    const handlePlay = () => {
        playSong(songs);
        closeModal();
    };
    const handleDownloadSongs = () => {
        console.log('Download songs');
        closeModal();
    };
    const handleDelete = () => {
        console.log('Delete');
        closeModal();
    };

    return (
        <>
            <Fragment>
                {songsNotAdd.length ? (
                    <Pressable
                        style={styles.optionItem}
                        onPress={handleAddToNowPlayingPlaylist}>
                        <View style={styles.svg}>
                            <PlayListAddSvg width={25} height={25}/>
                        </View>

                        <Text style={styles.optionText}>
                            {I18n.translate('optionModal.add-to-now-playlist')}
                        </Text>
                    </Pressable>
                ) : null}

                <Pressable
                    style={styles.optionItem}
                    onPress={handlePlay}>
                    <View style={styles.svg}>
                        <PlaySvg width={25} height={25}/>
                    </View>

                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.play')}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPress={handleDownloadSongs}>
                    <View style={styles.svg}>
                        <DownloadSvg width={25} height={25}/>
                    </View>

                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.download-songs')}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPress={handleDelete}>
                    <View style={styles.svg}>
                        <DeleteSvg width={25} height={25}/>
                    </View>

                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.delete-from-library')}
                    </Text>
                </Pressable>
            </Fragment>
        </>
    );
};

export default AlbumPlayOptions;
