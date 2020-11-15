/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import Controller from '../controller';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import I18n from './../../../i18n';
import { SongItem, MusicChartItem } from './components';
import { GoBackButton } from '../../../shared/components';
import SongList from '../../../shared/components/flatlist/song-list';
import {songs} from '../../../data/song';
import { Song } from '../../../models/song';
import { Item } from '../../../shared/components/flatlist/item';
import { AlbumList } from '../../../shared/components/flatlist';
import { album } from '../../../data/album';

interface Props extends DispatchProps, StateProps {
    navigation: any,
}
const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});
const Singer: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation} = props;
    let description = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
    const [name, setName] = useState<string>('Aille');
    const [shortSongs, setShortSongs] = useState<Array<Song>>(undefined);

    useEffect(() => {
        setShortSongs(songs.slice(0, 3));
    }, [])

    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };
    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const renderSongList = () => {
        return (
            shortSongs && 
            <SongList 
                navigation={navigation} 
                songs={shortSongs} 
                disableScroll={true}
            />
        )
    };

    return (
        <>
            <ImageBackground style={styles.imageBackground} source={require('../../../assets/images/singer.png')} >
                <View style={styles.container}>
                    <GoBackButton navigation={navigation} />

                    <ScrollView nestedScrollEnabled={true} >
                        <View style={styles.avatarView}>
                            <Image 
                                source={require('../../../assets/images/singer.png')} 
                                style={styles.avatar}
                            />
                        </View>

                        <View style={styles.group}>
                            <Text style={styles.name}>{name}</Text>
                            <TouchableOpacity>
                                <Text style={styles.title}>{I18n.translate('singer.info')} <ArrowSvg/></Text>
                            </TouchableOpacity>
                            <Text numberOfLines={2} style={styles.description}>
                                {description}
                            </Text>
                        </View>
                        <View style={styles.group}>
                            <TouchableOpacity>
                                <Text style={styles.title}>{I18n.translate('singer.songs')} <ArrowSvg/></Text>
                            </TouchableOpacity>
                            {renderSongList()}
                        </View>
                        <View style={styles.group}>
                            <TouchableOpacity>
                                <Text style={styles.title}>{I18n.translate('singer.album')} <ArrowSvg/></Text>
                            </TouchableOpacity>
                            <AlbumList 
                                navigation={navigation}
                                playlist={album}
                                isHorizontal={true}
                            />
                            {/* <FlatList
                                horizontal={true}
                                data={chartDummyData}
                                renderItem={({item}) => (<MusicChartItem title={item.title} image={item.image} onClick={() => {}}/>)}
                                keyExtractor={item => item.id.toString()}
                                style={{marginLeft: -20}}
                            /> */}
                        </View>
                    </ScrollView>
                </View>
                <Controller />
            </ImageBackground>
        </>
    );
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>
export default connect(mapStateToProps, mapDispatchToProps)(Singer);
const songDummyData = [
    {
        id: 1,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        name: 'Song1',
    },
    {
        id: 2,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        name: 'Song2',
    },
    {
        id: 3,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        name: 'Song3',
    },
    {
        id: 4,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        name: 'Song4',
    },
];
const chartDummyData = [
    {
        id: 1,
        image: 'https://avatar-nct.nixcdn.com/topic/share/2017/12/06/9/4/b/b/1512556174027.jpg',
        title: 'Album 1',
    },
    {
        id: 2,
        image: 'https://i1.sndcdn.com/avatars-000296280782-1a82nz-t500x500.jpg',
        title: 'Album 2',
    },
    {
        id: 3,
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/2/9/d/029d613e30bbd38670e75b78b977257d.jpg',
        title: 'Album 3',
    },
];
