import React from 'react';
import { BaseScreen } from '../../../../shared/components';
import { SongList } from './../../../../shared/components/flatlist';

interface Props {
    navigation: any,
    route: any
}

export const LastestSong: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {songs} = route.params;

    return (
        <>
            <BaseScreen>
                <SongList 
                    navigation={navigation}
                    songs={songs}
                />
            </BaseScreen>
        </>
    )
}

export default LastestSong;
