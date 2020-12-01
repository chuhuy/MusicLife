import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import PlayListAddSvg from './../../../../assets/icons/playlist-add.svg';
import HeartSvg from './../../../../assets/icons/heart.svg';
import PlusSvg from './../../../../assets/icons/plus.svg';
import DownloadSvg from './../../../../assets/icons/download.svg';
import SingerSvg from './../../../../assets/icons/singer.svg';
import I18n from './../../../../i18n';

interface Props {}

export const SongOptions: React.FunctionComponent<Props> = (props: Props) => {
    const {} = props;
    const handleAddToNowPlayingPlaylist = () => {
        console.log('Add to now playing playlist');
    };
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
                    onPressOut={handleAddToNowPlayingPlaylist}>
                    <View style={styles.svg}>
                        <PlayListAddSvg width={25} height={25} />
                    </View>
                    <Text style={styles.optionText}>
                        {I18n.translate('optionModal.add-to-now-playlist')}
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
