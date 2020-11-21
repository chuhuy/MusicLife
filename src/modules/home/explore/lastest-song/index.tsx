import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { HeaderBack } from '../../../../shared/components';
import { styles } from './styles';
import {SongList} from './../../../../shared/components/flatlist';

interface Props {
    navigation: any,
    route: any
}

export const LastestSong: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {songs} = route.params;

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack 
                    navigation={navigation}
                    title={'LastestSong'}
                />

                <View style={styles.body}>
                    <SongList 
                        navigation={navigation}
                        songs={songs}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default LastestSong;