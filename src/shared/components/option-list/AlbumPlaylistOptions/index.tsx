import React, {Fragment, useEffect, useState} from 'react';
import {Text, Pressable, View} from 'react-native';
import {styles} from './styles';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import PlaySvg from './../../../../assets/icons/play.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import DeleteSvg from './../../../../assets/icons/delete.svg';
import I18n from './../../../../i18n';
import { Song } from '../../../../models/song';
import { addSong } from '../../../../redux/modules/player/actions';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { addSongs, getNotExistSongs } from '../../../helper/player';

interface Props {
    songs?: Array<Song>,
    album_id?: number
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addSong: (songs: Array<Song>) => dispatch(addSong(songs))
    };
};

const AlbumPlayOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {songs, album_id} = props;
    const [songsNotAdd, setSongsNotAdd] = useState<Array<Song>>([]);

    useEffect(() => {
        const handleAddedToPlaying = async () => {
            const currentTracks = await TrackPlayer.getQueue();

            let songsNotExist = getNotExistSongs(currentTracks, songs);
        
            setSongsNotAdd(songsNotExist);
        }

        handleAddedToPlaying();
    }, []);

    const handleAddToNowPlayingPlaylist = () => {
        addSongs(songsNotAdd);

        console.log('Add to now playing playlist');
    };
    const handlePlay = () => {
        console.log('Play');
    };
    const handleDownloadSongs = () => {
        console.log('Download songs');
    };
    const handleDelete = () => {
        console.log('Delete');
    };
    return (
        <>
            <Fragment>
                {songsNotAdd.length && (
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
                )}

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
