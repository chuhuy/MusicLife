import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Song } from '../../../../../models/song';
import { styles } from './styles';
import { Item } from '../../../../../shared/components/flatlist/item';
import ModalBottom from '../../../../../shared/components/modal-bottom';
import SongOptions from '../../../../../shared/components/option-list/SongOptions';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    songs: state.player.songs,
    songIndex: state.player.songIndex,
});

const NowPlaying: React.FunctionComponent<Props> = (props: Props) => {
    const {songs, songIndex} = props;
    const [chooseSong, setChooseSong] = useState<Song>(null);

    const onClickSong = (song: Song) => {
        console.log('click song');
    };

    const onOptionClick = (song: Song) => {
        setChooseSong(song);
    };

    const closeModal = () => {
        setChooseSong(null);
    };

    const renderCurrentPlaying = songs.map((song: Song, index: number) => {
        return (
            <View
                key={song.music_id}
                style={[styles.songRow, songIndex === index && styles.songRowActive]}>
                <Item
                    name={song.title}
                    image={song.image_url}
                    artist={song.artists}
                    onClick={() => onClickSong(song)}
                    onOptionClick={() => onOptionClick(song)}
                />
            </View>
        );
    });
    
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.nowPlaying}>
                {renderCurrentPlaying()}
            </ScrollView>
            <ModalBottom
                isVisible={chooseSong !== null}
                onHide={closeModal}
                item={{
                    image_url: chooseSong.image_url,
                    artists: chooseSong.artists,
                    title: chooseSong.title,
                }}>
                <SongOptions song={chooseSong} closeModal={closeModal}/>
            </ModalBottom>
        </>
    );
};

export default connect(mapStateToProps, null)(NowPlaying);

type StateProps = ReturnType<typeof mapStateToProps>;
