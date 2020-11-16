import React from 'react';
import I18n from '../../../../i18n';
import { SafeAreaView, View } from 'react-native';
import { HeaderBack } from '../../../../shared/components';
import { PlaylistList } from '../../../../shared/components/flatlist';
import { styles } from './styles';

interface Props {
    navigation: any,
    route: any
}

const LatestPlaylist: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {isAlbum, playlist} = route.params;

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack 
                    navigation={navigation}
                    title={isAlbum ? I18n.translate('explore.latest-album') : I18n.translate('explore.latest-playlist')}
                />

                <View style={styles.body}>
                    <PlaylistList 
                        navigation={navigation}
                        isAlbum={isAlbum}
                        playlist={playlist}
                        size={2}
                        isHorizontal={false}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default LatestPlaylist;