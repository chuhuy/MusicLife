/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchArtistDetail } from '../../../api/explore';
import { Artist } from '../../../models/artist';
import { Playlist } from '../../../models/playlist';
import { Song } from '../../../models/song';
import { disableLoading, enableLoading } from '../../../redux/modules/loading/actions';
import { HeaderBack, SectionTitle } from '../../../shared/components';
import { AlbumList } from '../../../shared/components/flatlist';
import SongList from '../../../shared/components/flatlist/song-list';
import { Screen } from '../../../shared/constance/screen';
import Controller from '../controller';
import I18n from './../../../i18n';
import { styles } from './styles';

interface Props extends DispatchProps, StateProps {
    navigation: any,
    route: any,
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        enableLoading: () => dispatch(enableLoading()),
        disableLoading: () => dispatch(disableLoading()),
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});
const Singer: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {artist} = route.params;
    const [currentArtist, setCurentArtist] = useState<Artist>(artist);
    const [shortSongs, setShortSongs] = useState<Array<Song>>([]);
    const [songs, setSongs] = useState<Array<Song>>([]);
    const [albums, setAlbums] = useState<Array<Playlist>>([]);
    const [showDetail, setShowDetail] = useState<boolean>(false);

    useEffect(() => {
        enableLoading();

        fetchArtistDetail(artist.artist_id)
            .then(data => {
                let {artistSongs, artistAlbums} = data;
                setSongs(artistSongs);
                setAlbums(artistAlbums);
                setShortSongs(artistSongs.slice(0, 3));
                disableLoading();
            })
            .catch(err => {
                console.log(err);
                disableLoading();
            });
    }, []);

    useEffect(() => {
        setCurentArtist(artist);
    }, [artist]);

    const handleSong = () => {
        navigation.navigate(Screen.Common.Song, {
            artistSongs: songs,
        });
    };

    const handleAlbum = () => {
        navigation.navigate(Screen.Common.Playlist, {
            artistAlbums: albums,
            isAlbum: true,
        });
    };

    const toggleInfo = () => {
        setShowDetail(!showDetail);
    }

    const renderArtistInfo = () => {
        return (
            <>
                <View style={styles.avatarView}>
                    <Image
                        source={{uri:(currentArtist.image_url)}}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.group}>
                    <SectionTitle
                        title={I18n.translate('singer.info')}
                        onClick={toggleInfo}
                    />
                    {showDetail ? (
                        <Text style={styles.description}>
                            {currentArtist.description.replace(/<br>/g, '')}
                        </Text>
                    ) : (
                        <Text numberOfLines={2} style={styles.description}>
                            {currentArtist.description.replace(/<br>/g, '')}
                        </Text>
                    )}
                </View>
            </>
        );
    };

    const renderSongList = () => {
        return (
            shortSongs && <SongList songs={shortSongs} disableScroll={true}/>
        );
    };

    return (
        <>
            <ImageBackground style={styles.imageBackground} source={{uri: artist.image_url}} >
                <View style={styles.layer} />

                <View style={styles.container}>
                    <View style={styles.headerBack}>
                        <HeaderBack/>
                    </View>

                    <ScrollView nestedScrollEnabled={true}>
                        {renderArtistInfo()}

                        <View style={styles.group}>
                            <SectionTitle
                                title={I18n.translate('singer.songs')}
                                onClick={handleSong}
                            />
                            {renderSongList()}
                        </View>

                        <View style={styles.group}>
                            <SectionTitle title={I18n.translate('singer.album')} onClick={handleAlbum}/>
                            <AlbumList playlist={albums} isHorizontal={true}/>
                        </View>
                    </ScrollView>
                </View>

                <Controller />
            </ImageBackground>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(Singer);
