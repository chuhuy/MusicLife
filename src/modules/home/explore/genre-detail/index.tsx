import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { fetchGenreDetail } from '../../../../api/explore';
import { album, songs } from '../../../../data';
import I18n from '../../../../i18n';
import { Playlist } from '../../../../models/playlist';
import { Song } from '../../../../models/song';
import { BaseScreen, LoadingLayer, SectionTitle } from '../../../../shared/components';
import { AlbumList, PlaylistList, SongList } from '../../../../shared/components/flatlist';
import { Screen } from '../../../../shared/constance/screen';
import { MoreButton } from '../../search/components/more-button';
import { styles } from './styles';

interface Props {
    navigation: any,
    route: any
}

const GenreDetail: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation, route } = props;
    const { genre } = route.params;
    const [songList, setSongList] = useState<Array<Song>>([]);
    const [albumList, setAlbumList] = useState<Array<Playlist>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchGenreDetail(genre.genre_id)
            .then((data) => {
                setSongList(data.songsByGenre);
                setAlbumList(data.albumsByGenre);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.log(err)
            })
    }, []);
    
    const handleSongList = () => {
        navigation.navigate(Screen.Common.Song, {
            songs,
            genre_id: genre.genre_id,
            isLatest: false
        })
    }

    const handleAlbumList = () => {
        navigation.navigate(Screen.Common.Playlist, {
            isAlbum: true,
            genre_id: genre.genre_id,
            isLatest: false
        })
    }

    return (
        <>
            <BaseScreen isScroll={true}>
                {isLoading ? (
                    <LoadingLayer />
                ) : (
                    <>
                        <View style={styles.section}>
                            <SectionTitle title={I18n.translate('search.songs')} onClick={handleSongList} />

                            <SongList disableScroll={true} songs={songList}>
                                <MoreButton onClick={handleSongList} />
                            </SongList>
                        </View>
                        
                        <View style={styles.section}>
                            <SectionTitle title={I18n.translate('search.albums')} onClick={handleAlbumList} />

                            <PlaylistList
                                playlist={albumList}
                                isHorizontal={true}>
                                <MoreButton onClick={handleAlbumList} />
                            </PlaylistList>
                        </View>
                    </>
                )}
            </BaseScreen>
        </>
    )
}

export default GenreDetail;
