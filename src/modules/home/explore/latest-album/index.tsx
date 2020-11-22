import React from 'react';
import I18n from '../../../../i18n';
import { HeaderScreen } from '../../../../shared/components';
import { PlaylistList } from '../../../../shared/components/flatlist';

interface Props {
    navigation: any,
    route: any
}

const LatestPlaylist: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {isAlbum, playlist} = route.params;
    
    return (
        <>
            <HeaderScreen
                navigation={navigation}
                title={I18n.translate('explore.latest-album')}>
                <PlaylistList 
                    navigation={navigation}
                    isAlbum={isAlbum}
                    playlist={playlist}
                    numsColumn={2}
                />
            </HeaderScreen>
        </>
    )
}

export default LatestPlaylist;
