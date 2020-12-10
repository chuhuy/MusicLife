import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Item } from '../../../../../shared/components/flatlist/item';
import { playSongNowPlaying } from '../../../../../shared/helper/player';
import { styles } from './styles';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    songs: state.player.songs,
    songIndex: state.player.songIndex,
});

const NowPlaying: React.FunctionComponent<Props> = (props: Props) => {
    const {songs, songIndex} = props;

    const onClickSong = (index: number) => {
        console.log('click song');
        if (index !== songIndex) {
            playSongNowPlaying(index);
        }
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
                                onClick={() => onClickSong(index)}
                                theme="light"
                                hideOption={true}
                            />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.music_id.toString()}
            />
        </>
    );
};

export default connect(mapStateToProps, null)(NowPlaying);

type StateProps = ReturnType<typeof mapStateToProps>;
