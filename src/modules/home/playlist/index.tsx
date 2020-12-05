import React, { useEffect, useState } from 'react';
import { fetchAblumByGenre } from '../../../api/explore';
import { Playlist } from '../../../models/playlist';
import { BaseScreen, PlaylistList } from '../../../shared/components';

interface Props {
    route: any
}

const LatestPlaylist: React.FunctionComponent<Props> = (props: Props) => {
    const {route} = props;
    const {isAlbum, genre_id, playlist} = route.params;
    const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchAblumByGenre(genre_id)
            .then((data) => {
                setPlaylists(data.albumsByGenre);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }, [])
    
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
    )
}

export default LatestPlaylist;
