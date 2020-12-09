import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Song } from '../../../../../models/song';
import { Item } from '../../../../../shared/components/flatlist/item';
import ModalBottom from '../../../../../shared/components/modal-bottom';
import SongOptions from '../../../../../shared/components/option-list/SongOptions';
import { styles } from './styles';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    songs: state.player.songs,
    songIndex: state.player.songIndex,
});

const NowPlaying: React.FunctionComponent<Props> = (props: Props) => {
    const {songs, songIndex} = props;
    const [chooseSong, setChooseSong] = useState<Song>();

    const onClickSong = (song: Song) => {
        console.log('click song');
    };

    const onOptionClick = (song: Song) => {
        setChooseSong(song);
    };

    const closeModal = () => {
        setChooseSong(null);
    };
    
    return (
        <>
            <FlatList 
                contentContainerStyle={styles.nowPlaying}
                showsVerticalScrollIndicator={false}
                data={songs}
                renderItem={({item, index}) => {
                    return (
                        <View
                            key={item.music_id}
                            style={[styles.songRow, songIndex === index && styles.songRowActive]}>
                            <Item
                                name={item.title}
                                image={item.image_url}
                                artist={item.artists}
                                onClick={() => onClickSong(item)}
                                onOptionClick={() => onOptionClick(item)}
                            />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.music_id.toString()}
            />
            
            {chooseSong ? (
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
            ) : null}
        </>
    );
};

export default connect(mapStateToProps, null)(NowPlaying);

type StateProps = ReturnType<typeof mapStateToProps>;
