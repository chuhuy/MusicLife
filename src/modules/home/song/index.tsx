import React, {useEffect, useState} from 'react';
import { fetchLatestSong } from '../../../api/explore';
import { Song } from '../../../models/song';
import { BaseScreen, LoadingLayer, SongList } from '../../../shared/components';
import { LATEST_SONG_ITEM, MAX_PAGE_LATEST_SONG } from '../../../shared/constance/pagination';
import { calculatePagination } from '../../../shared/helper/pagination';

interface Props {
    route: any
}

export const LastestSong: React.FunctionComponent<Props> = (props: Props) => {
    const [songList, setSongList] = useState<Array<Song>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchSong = async () => {
        const {first, offset} = calculatePagination(MAX_PAGE_LATEST_SONG, LATEST_SONG_ITEM, currentPage); 
        
        if (first) {
            setIsLoading(true);
            fetchLatestSong(first, offset)
                .then(data => {
                    setSongList([...songList, ...data.latestSongs]);
                    setCurrentPage(prevState => ++prevState);
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }

    useEffect(() => {
        fetchSong();
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

export default LastestSong;
