import React from 'react';
import { BaseScreen } from '../../../../shared/components';
import { PlaylistList } from '../../../../shared/components/flatlist';

interface Props {
    route: any
}

const LatestPlaylist: React.FunctionComponent<Props> = (props: Props) => {
    const {route} = props;
    const {isAlbum, playlist} = route.params;
    
    return (
        <>
            <BaseScreen>    
                <PlaylistList 
                    isAlbum={isAlbum}
                    playlist={playlist}
                    numsColumn={2}
                />    
            </BaseScreen>
        </>
    )
}

export default LatestPlaylist;
