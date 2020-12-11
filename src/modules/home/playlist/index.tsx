import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAblumByGenre, fetchLatestAlbum } from '../../../api/explore';
import { Playlist } from '../../../models/playlist';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { BaseScreen, PlaylistList } from '../../../shared/components';

interface Props extends DispatchProps {
    route: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      enableLoading: () => dispatch(enableLoading()),
      disableLoading: () => dispatch(disableLoading()),
    };
};

const PlaylistScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {
        route,
        enableLoading,
        disableLoading,
    } = props;
    const { isAlbum, genre_id, isLatest, artistAlbums } = route.params;
    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);

    useEffect(() => {
        enableLoading();

        try {
            if (isLatest) {
                fetchLatestAlbum()
                    .then((data) => {
                        setPlaylists(data.albums);
                    });
            } else if (genre_id) {
                fetchAblumByGenre(genre_id)
                    .then((data) => {
                        setPlaylists(data.albumsByGenre);
                    });
            } else {
                setPlaylists(artistAlbums);
            }
        } catch (err) {
            console.log(err);
            disableLoading();
        }

        disableLoading();
    }, []);

    return (
        <>
            <BaseScreen>
                <PlaylistList
                    isAlbum={isAlbum}
                    playlist={playlists}
                    numsColumn={2}
                />
            </BaseScreen>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(PlaylistScreen);
