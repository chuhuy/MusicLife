import React from 'react';
import { BaseScreen, SongList } from '../../../shared/components';

interface Props {
    route: any
}

export const LastestSong: React.FunctionComponent<Props> = (props: Props) => {
    const {route} = props;
    const {songs} = route.params;

    return (
        <>
            <BaseScreen>
                <SongList songs={songs}/>
            </BaseScreen>
        </>
    )
}

export default LastestSong;
