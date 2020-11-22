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
                    title={I18n.translate('explore.latest-album')}
                />

                <View style={styles.body}>
                    <PlaylistList 
                        navigation={navigation}
                        isAlbum={isAlbum}
                        playlist={playlist}
                        numsColumn={2}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default LatestPlaylist;