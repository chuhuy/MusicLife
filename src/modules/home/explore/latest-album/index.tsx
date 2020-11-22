import React from 'react';
import { BaseScreen } from '../../../../shared/components';
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
            <BaseScreen>    
                <PlaylistList 
                    navigation={navigation}
                    isAlbum={isAlbum}
                    playlist={playlist}
                    numsColumn={2}
                />    
            </BaseScreen>
        </>
    )
}

export default LatestPlaylist;
