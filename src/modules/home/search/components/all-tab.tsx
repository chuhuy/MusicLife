import React from 'react';
import I18n from '../../../../i18n';
import { StyleSheet, View } from 'react-native';
import { Artist } from '../../../../models/artist';
import { SectionTitle } from '../../../../shared/components';
import {TYPE} from '../index';
import { Song } from '../../../../models/song';
import { Playlist } from '../../../../models/playlist';
import { SongList } from '../../../../shared/components/flatlist';
import PlaylistList from '../../../../shared/components/flatlist/playlist';
import { MoreButton } from './more-button';
import { ArtistList } from './artist-list';

interface Props {
    navigation: any,
    artist: Array<Artist>,
    song: Array<Song>,
    album: Array<Playlist>,
    playlist?: Array<Playlist>,
    chooseType: (type: string) => void
}

export const AllTab: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, artist, song, album, chooseType} = props;

    return (
        <>
            <View style={styles.section}>
                <SectionTitle 
                    title={I18n.translate('search.artists')}
                    onClick={() => chooseType(TYPE.ALL)}
                />
                
                <ArtistList 
                    navigation={navigation}
                    artist={artist}
                />

                <View style={styles.buttonContainer}>
                    <MoreButton onClick={() => chooseType(TYPE.ARTIST)} />
                </View>
            </View>

            <View style={styles.section}>
                <SectionTitle 
                    title={I18n.translate('search.songs')} 
                    onClick={() => chooseType(TYPE.SONG)}
                />

                <SongList 
                    navigation={navigation}
                    disableScroll={true}
                    songs={song}
                >
                    <View style={styles.buttonContainer}>
                        <MoreButton onClick={() => chooseType(TYPE.SONG)} />
                    </View>
                </SongList>
            </View>
            <View style={styles.section}>
                <SectionTitle 
                    title={I18n.translate('search.albums')}
                    onClick={() => chooseType(TYPE.ALBUM)}
                />

                <PlaylistList
                    navigation={navigation}
                    playlist={album}
                    disableScroll={true}
                >
                    <View style={styles.buttonContainer}>
                        <MoreButton onClick={() => chooseType(TYPE.ALBUM)} />
                    </View>
                </PlaylistList>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10
    }
})
