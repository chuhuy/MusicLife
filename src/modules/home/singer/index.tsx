/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import I18n from './../../../i18n';
import { SongItem, MusicChartItem } from './components';
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
    let description = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
    const [name, setName] = useState<string>('Aille');
    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };
    const handleOpenOption = () => {
        console.log('Opened option');
    };
    return (
        <>
            <ImageBackground style={styles.container} source={require('../../../assets/img/singer.png')} >
                {/* <Image 
                    source={require('../../../assets/img/singer.png')} 
                    style={styles.backgroundAvatar} 
                    blurRadius={3}
                /> */}
                <View style={styles.header}>
                    <TouchableOpacity onPressOut={() => props.navigation.goBack()}>
                        <ArrowBackSvg width={20} height={20}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.main}>
                    <View style={styles.avatarView}>
                        <Image 
                            source={require('../../../assets/img/singer.png')} 
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
                        <FlatList
                            renderItem={({item}) => (<SongItem name={item.name} image={item.image} artist={name} onClick={() => handlePlayMusic()} onOptionClick={() => handleOpenOption()}/>)}
                            data={songDummyData}
                            keyExtractor={item => item.id.toString()}
                            horizontal={false}
                        />
                    </View>
                    <View style={styles.group}>
                        <TouchableOpacity>
                            <Text style={styles.title}>{I18n.translate('singer.album')} <ArrowSvg/></Text>
                        </TouchableOpacity>
                        <FlatList
                            horizontal={true}
                            data={chartDummyData}
                            renderItem={({item}) => (<MusicChartItem title={item.title} image={item.image} onClick={() => {}}/>)}
                            keyExtractor={item => item.id.toString()}
                            style={{marginLeft: -20}}
                        />
                    </View>
                </ScrollView>
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
