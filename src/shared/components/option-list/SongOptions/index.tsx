import React, {Fragment, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import HeartSvg from './../../../../assets/icons/heart.svg';
import PlusSvg from './../../../../assets/icons/plus.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import SingerSvg from './../../../../assets/icons/singer.svg';
import I18n from './../../../../i18n';
import { connect } from 'react-redux';
import { Song } from '../../../../models/song';
import { addSong, removeSong } from '../../../../redux/modules/player/actions';
import TrackPlayer from 'react-native-track-player';
import TrashIcon from '../../../../assets/icons/delete.svg';

interface Props extends DispatchProps {
    song: Song,
    closeModal: () => void,
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addSong: (songs: Array<Song>) => dispatch(addSong(songs)),
        removeSong: (song: Song) => dispatch(removeSong(song))
    };
};

const SongOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {addSong, removeSong, song, closeModal} = props;
    const [isAddPlaying, setIsAddPlaying] = useState<boolean>(false);

    useEffect(() => {
        const handleAddedToPlaying = async () => {
            const currentTracks = await TrackPlayer.getQueue();
            let isAdded = false;

            if (currentTracks) {
                for (let i = 0; i < currentTracks.length; i++) {
                    if (song.music_id.toString() === currentTracks[i].id) {
                        isAdded = true;
                    }
                }
            }

            if (isAdded) setIsAddPlaying(isAdded);
        }

        handleAddedToPlaying();
    }, []);

    const handleNowPlayingPlaylist = () => {
        if (isAddPlaying) {
            removeSong(song);
        } else addSong([song]);
        closeModal();
    }

    const handleAddToFavorite = () => {
        console.log('Add to favorite');
    };
    const handleAddToPlaylist = () => {
        console.log('Add to playlist');
    };
    const handleDownload = () => {
        console.log('Download');
    };
    const handleSingerPressOut = () => {
        console.log('Singer');
    };
    return (
        <>
            <Fragment>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleNowPlayingPlaylist}>
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
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleAddToFavorite}>
                    <View style={styles.svg}>
                        <HeartSvg width={25} height={25} />
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-favorite')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleAddToPlaylist}>
                    <View style={styles.svg}>
                        <PlusSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-playlist')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleDownload}>
                    <View style={styles.svg}>
                        <DownloadSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.download')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleSingerPressOut}>
                    <View style={styles.svg}>
                        <SingerSvg width={25} height={25} />
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.singers')}
                    </Text>
                </TouchableOpacity>
            </Fragment>
        </>
    );
};

export default connect(null, mapDispatchToProps)(SongOptions);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
