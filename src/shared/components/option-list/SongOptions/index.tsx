import React, {Fragment, useEffect, useState} from 'react';
import {Text, Pressable, View} from 'react-native';
import {styles} from './styles';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import HeartSvg from './../../../../assets/icons/heart.svg';
import PlusSvg from './../../../../assets/icons/plus.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import SingerSvg from './../../../../assets/icons/singer.svg';
import I18n from './../../../../i18n';
import { connect } from 'react-redux';
import { Song } from '../../../../models/song';
import { removeSong } from '../../../../redux/modules/player/actions';
import TrackPlayer from 'react-native-track-player';
import TrashIcon from '../../../../assets/icons/delete.svg';
import { addSongs, getNotExistSongs, removeSongs } from '../../../helper/player';

interface Props extends DispatchProps {
    song: Song,
    closeModal: () => void,
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeSong: (song: Song) => dispatch(removeSong(song))
    };
};

const SongOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {removeSong, song, closeModal} = props;
    const [isAddPlaying, setIsAddPlaying] = useState<boolean>(false);

    useEffect(() => {
        const handleAddedToPlaying = async () => {
            const currentTracks = await TrackPlayer.getQueue();

            let songsNotExist = getNotExistSongs(currentTracks, [song]);
        
            if (!songsNotExist.length) {
                setIsAddPlaying(true);
            }
        }

        handleAddedToPlaying();
    }, []);

    const handleNowPlayingPlaylist = async () => {
        if (isAddPlaying) {
            TrackPlayer.remove(song.music_id.toString())
                .then(() => {
                    removeSong(song);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            addSongs([song]);
        }
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
                <Pressable
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
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPressOut={handleAddToFavorite}>
                    <View style={styles.svg}>
                        <HeartSvg width={25} height={25} />
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-favorite')}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPressOut={handleAddToPlaylist}>
                    <View style={styles.svg}>
                        <PlusSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-playlist')}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.optionItem}
                    onPressOut={handleDownload}>
                    <View style={styles.svg}>
                        <DownloadSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.download')}
                    </Text>
                </Pressable>
                
                <Pressable
                    style={styles.optionItem}
                    onPressOut={handleSingerPressOut}>
                    <View style={styles.svg}>
                        <SingerSvg width={25} height={25} />
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.singers')}
                    </Text>
                </Pressable>
            </Fragment>
        </>
    );
};

export default connect(null, mapDispatchToProps)(SongOptions);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
