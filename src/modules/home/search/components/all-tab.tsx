import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '../../../../i18n';
import { Artist } from '../../../../models/artist';
import { Playlist } from '../../../../models/playlist';
import { Song } from '../../../../models/song';
import { SectionTitle } from '../../../../shared/components';
import { SongList } from '../../../../shared/components/flatlist';
import PlaylistList from '../../../../shared/components/flatlist/playlist';
import { ArtistList } from './artist-list';
import { MoreButton } from './more-button';

interface Props {
    artist: Array<Artist>,
    song: Array<Song>,
    album: Array<Playlist>,
    chooseType: (index: number) => void
}

export const AllTab: React.FunctionComponent<Props> = (props: Props) => {
    const {artist, song, album, chooseType} = props;
    const [index, setIndex] = useState({});

    useEffect(() => {
        if (artist.length || song.length || album.length) {
            let tabIndex = {};
            let totalTab = 1;
            
            if (artist.length) {
                tabIndex = {
                    ...tabIndex,
                    artist: totalTab++,
                };
            }

            if (song.length) {
                tabIndex = {
                    ...tabIndex,
                    song: totalTab++,
                };
            }

            if (album.length) {
                tabIndex = {
                    ...tabIndex,
                    album: totalTab++,
                };
            }

            setIndex(tabIndex);
        }
    }, []);

    return (
        <>
            {artist.length || song.length || album.length ? (
                <>
                    {artist.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.artists')}
                                onClick={() => chooseType(index.artist)}
                            />

                            <ArtistList artist={artist}/>

                            <View style={styles.buttonContainer}>
                                <MoreButton onClick={() => chooseType(index.artist)} />
                            </View>
                        </View>
                    ) : null}

                    {song.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.songs')}
                                onClick={() => chooseType(index.song)}
                            />

                            <SongList
                                disableScroll={true}
                                songs={song}
                            >
                                <MoreButton onClick={() => chooseType(index.song)} />
                            </SongList>
                        </View>
                    ) : null}

                    {album.length ? (
                        <View style={styles.section}>
                            <SectionTitle
                                title={I18n.translate('search.albums')}
                                onClick={() => chooseType(index.album)}
                            />

                            <PlaylistList
                                playlist={album}
                                disableScroll={true}
                            >
                                <MoreButton onClick={() => chooseType(index.album)} />
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
