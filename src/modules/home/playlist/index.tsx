import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAblumByGenre } from '../../../api/explore';
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
    const { isAlbum, genre_id } = route.params;
    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);

    useEffect(() => {
        enableLoading();

        fetchAblumByGenre(genre_id)
            .then((data) => {
                setPlaylists(data.albumsByGenre);
                disableLoading();
            })
            .catch((err) => {
                console.log(err);
                disableLoading();
            });
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
