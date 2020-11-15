import React from 'react';
import { View, Image, ImageBackground, Text, FlatList } from 'react-native';
import { IconButton } from '../../../shared/components';
import { styles } from './styles';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';
import Heart from './../../../assets/icons/heart.svg';
import Option from './../../../assets/icons/option.svg';
import { SongItem } from './components';
import { songs } from './../../../data/song';
interface Props {
    navigation: any,
    route: any,
}

const PlaylistScreen: React.FunctionComponent<Props> = (props: Props) => {
    console.log(props.route.params)
    const { newPlaylist } = props.route.params;
    const handleBack = () => {
        props.navigation.goBack();
    };
    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };
    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <View style={styles.container}>
                <ImageBackground style={styles.sectionOne} blurRadius={10} source={{uri: newPlaylist.image_url || ''}}>
                    <View style={styles.header}>
                        <IconButton icon={ArrowLeft} onClick={handleBack}/>
                    </View>
                    <Image source={{uri: newPlaylist.image_url || ''}} style={styles.image}/>
                    <View style={styles.control}>
                        <View style={styles.titleGroup}>
                            <Text style={styles.playlistName}>{newPlaylist.name || ''}</Text>
                            {/* <Text style={styles.artist}>Artist</Text> */}
                        </View>
                        <View style={styles.buttonGroup}>
                            <View style={styles.button}>
                                <IconButton icon={Heart} onClick={() => {}}/>
                            </View>
                            <View style={styles.button}>
                                <IconButton icon={Option} onClick={() => {}}/>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.sectionTwo}>
                    <FlatList
                        data={songs}
                        renderItem={({item}) => (<SongItem title={item.title} artist={item.artist} image={item.image_url} onOptionClick={handleOpenOption} onClick={handlePlayMusic}/>)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        </>
    );
};

export default PlaylistScreen;
