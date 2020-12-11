import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAlbumDetail, fetchLatestSong, fetchSongByGenre } from '../../../api/explore';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { BaseScreen, SongList } from '../../../shared/components';

interface Props extends DispatchProps {
    route: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      enableLoading: () => dispatch(enableLoading()),
      disableLoading: () => dispatch(disableLoading()),
    };
};

export const SongScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {
        route,
        enableLoading,
        disableLoading,
    } = props;

    const [songList, setSongList] = useState<Array<Song>>([]);

    const fetchData = () => {
        const { isLatest, genre_id } = route.params;
        
        if (isLatest) {
            return fetchLatestSong();
        } else if (genre_id) {
            return fetchSongByGenre(genre_id);
        }
    };

    useEffect(() => {
        enableLoading();
        let { artistSongs } = route.params;

        if (artistSongs) {
            setSongList(artistSongs);
            disableLoading();
        } else {
            fetchData()
                .then(data => {
                    setSongList([...songList, ...data.songs]);
                    disableLoading();
                })
                .catch(err => {
                    console.log(err);
                    disableLoading();
                });
        }
    }, []);

    return (
        <BaseScreen>
            <SongList songs={songList}/>
        </BaseScreen>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(SongScreen);
