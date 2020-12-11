import React from 'react';
import { StyleSheet, View } from 'react-native';
import { songs } from '../../../../data';
import I18n from '../../../../i18n';
import { Artist } from '../../../../models/artist';
import { Playlist } from '../../../../models/playlist';
import { Song } from '../../../../models/song';
import { SectionTitle } from '../../../../shared/components';
import { SongList } from '../../../../shared/components/flatlist';
import PlaylistList from '../../../../shared/components/flatlist/playlist';
import { TYPE } from '../index';
import { ArtistList } from './artist-list';
import { MoreButton } from './more-button';

interface Props {
    artist: Array<Artist>,
    song: Array<Song>,
    album: Array<Playlist>,
    chooseType: (type: string) => void
}

export const AllTab: React.FunctionComponent<Props> = (props: Props) => {
    const {artist, song, album, chooseType} = props;

    return (
        <>
            {artist.length || song.length || album.length ? (
                <>
                    {artist.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.artists')}
                                onClick={() => chooseType(TYPE.ALL)}
                            />

                            <ArtistList artist={artist}/>

                            <View style={styles.buttonContainer}>
                                <MoreButton onClick={() => chooseType(TYPE.ARTIST)} />
                            </View>
                        </View>
                    ) : null}

                    {songs.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.songs')}
                                onClick={() => chooseType(TYPE.SONG)}
                            />

                            <SongList
                                disableScroll={true}
                                songs={song}
                            >
                                <MoreButton onClick={() => chooseType(TYPE.SONG)} />
                            </SongList>
                        </View>
                    ) : null}

                    {album.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.albums')}
                                onClick={() => chooseType(TYPE.ALBUM)}
                            />

                            <PlaylistList
                                playlist={album}
                                disableScroll={true}
                            >
                                <MoreButton onClick={() => chooseType(TYPE.ALBUM)} />
                            </PlaylistList>
                        </View>
                    ) : null}
                </>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    section: {
        paddingBottom: 30,
        marginTop: -5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
});
