/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import ArrowBackSvg from '../../../assets/icons/arrow-back.svg';
import ArrowSvg from '../../../assets/icons/arrow.svg';
import I18n from './../../../i18n';
import { SongItem } from './components/song-item';
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
                    <View style={styles.content}>
                        <Text style={styles.name}>{name}</Text>
                        <TouchableOpacity>
                            <Text style={styles.info}>{I18n.translate('singer.info')} <ArrowSvg/></Text>
                        </TouchableOpacity>
                        <Text numberOfLines={2} style={styles.description}>
                            {description}
                        </Text>
                    </View>
                    <View style={styles.songList}>
                        <TouchableOpacity>
                            <Text style={styles.songText}>{I18n.translate('singer.songs')} <ArrowSvg/></Text>
                        </TouchableOpacity>
                        <View>
                            <FlatList
                                renderItem={({item}) => (<SongItem name={item.name} image={item.image} artist={name} onClick={() => handlePlayMusic()} onOptionClick={() => handleOpenOption()}/>)}
                                data={songDummyData}
                                keyExtractor={item => item.id.toString()}
                                horizontal={false}
                            />
                        </View>
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
]