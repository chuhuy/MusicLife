import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import PlaySvg from './../../../../assets/icons/play.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import DeleteSvg from './../../../../assets/icons/delete.svg';
import I18n from './../../../../i18n';

interface Props {}

export const AlbumPlayOptions: React.FunctionComponent<Props> = (
    props: Props,
) => {
    const {} = props;
    const handleAddToNowPlayingPlaylist = () => {
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
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleAddToNowPlayingPlaylist}>
                    <View style={styles.svg}>
                        <PlayListAddSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-now-playlist')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handlePlay}>
                    <View style={styles.svg}>
                        <PlaySvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.play')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleDownloadSongs}>
                    <View style={styles.svg}>
                        <DownloadSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.download-songs')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPressOut={handleDelete}>
                    <View style={styles.svg}>
                        <DeleteSvg width={25} height={25}/>
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.delete-from-library')}
                    </Text>
                </TouchableOpacity>
            </Fragment>
        </>
    );
};
