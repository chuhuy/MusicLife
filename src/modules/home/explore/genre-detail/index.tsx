import React from 'react';
import { View } from 'react-native';
import { album, songs } from '../../../../data';
import I18n from '../../../../i18n';
import { BaseScreen, SectionTitle } from '../../../../shared/components';
import { PlaylistList, SongList } from '../../../../shared/components/flatlist';
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
    
    const handleSongList = () => {
        navigation.navigate(Screen.Common.Song, {
            songs,
            isLatest: false
        })
    }

    const handleAlbumList = () => {
        navigation.navigate(Screen.Common.Playlist, {
            isAlbum: true,
            playlist: album,
            isLatest: false
        })
    }

    return (
        <>
            <BaseScreen isScroll={true}>
                <View style={styles.section}>
                    <SectionTitle title={I18n.translate('search.songs')} onClick={handleSongList} />

                    <SongList disableScroll={true} songs={songs}>
                        <MoreButton onClick={handleSongList} />
                    </SongList>
                </View>
                
                <View>
                    <SectionTitle title={I18n.translate('search.albums')} onClick={handleAlbumList} />

                    <PlaylistList
                        playlist={album}
                        isHorizontal={true}>
                        <MoreButton onClick={handleAlbumList} />
                    </PlaylistList>
                </View>
            </BaseScreen>
        </>
    )
}

export default GenreDetail;
