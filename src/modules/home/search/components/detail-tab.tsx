import React from 'react';
import { View } from 'react-native';
import { Artist } from '../../../../models/artist';
import { Playlist } from '../../../../models/playlist';
import { Song } from '../../../../models/song';
import { PlaylistList, SongList } from '../../../../shared/components/flatlist';
import { ArtistList } from './artist-list';

interface SongTabProps {
    navigation: any,
    song: Array<Song>,
}

export const SongTab: React.FunctionComponent<SongTabProps> = (props: SongTabProps) => {
    const {navigation, song} = props;

    return (
        <>
            <View>
                <SongList 
                    navigation={navigation}
                    songs={song}
                />
            </View>
        </>
    )
}

interface PlaylistTabProps {
    navigation: any,
    playlist: Array<Playlist>,
}

export const PlaylistTab: React.FunctionComponent<PlaylistTabProps> = (props: PlaylistTabProps) => {
    const {navigation, playlist} = props;

    return (
        <>
            <View>
                <PlaylistList
                    navigation={navigation}
                    playlist={playlist}
                />
            </View>
        </>
    )
}

interface ArtistTabProps {
    navigation: any,
    artist: Array<Artist>,
}

export const ArtistTab: React.FunctionComponent<ArtistTabProps> = (props: ArtistTabProps) => {
    const {navigation, artist} = props;

    return (
        <>
            <View>
                <ArtistList
                    isHorizontal={false}
                    navigation={navigation}
                    artist={artist}
                />
            </View>
        </>
    )
}