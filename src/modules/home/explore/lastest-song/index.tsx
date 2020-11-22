import React from 'react';
import I18n from '../../../../i18n';
import { HeaderScreen } from '../../../../shared/components';
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
            <HeaderScreen 
                navigation={navigation}
                title={I18n.translate('explore.latest-song')}>
                <SongList 
                    navigation={navigation}
                    songs={songs}
                />
            </HeaderScreen>
        </>
    )
}

export default LastestSong;
