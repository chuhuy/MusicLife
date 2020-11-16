import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Playlist } from '../../../models/playlist';
import { playlist } from './../../../data/playlist';
import { MusicChartItem, SongItem, SectionTitle, PlaylistItem, GenreItem } from './../explore/components';
import { IconButton } from './../../../shared/components';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';

interface Props {
    navigation: any,
    route: any,
};
export const Playlistlist: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const handleOpenPlaylist = (value: any) => {
        const newPlaylist: Playlist = {
            id: value.playlist_id,
            name: value.name,
            image_url: value.image_url,
        };
        navigation.navigate('Playlist', {newPlaylist});
    };
    const handleBack = () => {
        navigation.goBack();
    };

    const isAlbum = true;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                        <IconButton icon={ArrowLeft} onClick={() => handleBack()}/>
                        <Text style={styles.headerTitle}>{'LastestPlaylist'}</Text>
                        <View style={{width: 20}}/>
                    </View>    
            <ScrollView>
                <View style={styles.latestPlaylist}>
                    <FlatList
                        horizontal={true}
                        data={playlist}
                        renderItem={({index}) => {
                            if ( index% 2 === 0) {return (
                                <View style={styles.multipleRow}>
                                    <PlaylistItem title={playlist[index].name} image={playlist[index].image_url} onClick={() => handleOpenPlaylist(playlist[index])}/>
                                    <PlaylistItem title={playlist[index + 1].name} image={playlist[index + 1].image_url} onClick={() => handleOpenPlaylist(playlist[index + 1])}/>
                                </View>
                            );}
                            else {return (<></>);}
                        }}
                        keyExtractor={item => item.playlist_id.toString()}
                    />                      
                </View>
            </ScrollView>
        </View>  
    );
};
export default Playlistlist;