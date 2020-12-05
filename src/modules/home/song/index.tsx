import React, { useEffect, useState } from 'react';
import { fetchAlbumDetail, fetchLatestSong, fetchSongByGenre } from '../../../api/explore';
import { Song } from '../../../models/song';
import { BaseScreen, LoadingLayer, SongList } from '../../../shared/components';

interface Props {
    route: any
}

export const SongScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {route} = props;
    const [songList, setSongList] = useState<Array<Song>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchData = () => {
        const {isLatest, genre_id, album_id} = route.params;
        
        if (isLatest) {
            return fetchLatestSong();
        } else if (genre_id) {
            return fetchSongByGenre(genre_id);
        } else {
            return fetchAlbumDetail(album_id);
        }
    }

    useEffect(() => {
        fetchData()
            .then(data => {
                setSongList([...songList, ...data.songsByGenre]);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
            <BaseScreen>
                {isLoading && !currentPage ? (
                    <LoadingLayer />
                ) : (
                    <>
                        <SongList songs={songList}/>
                        {isLoading && currentPage && <LoadingLayer />}
                    </>
                )}
                
            </BaseScreen>
        </>
    )
}

export default SongScreen;
