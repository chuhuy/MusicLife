import React from 'react';
import {View, Image, ImageBackground, Text, SafeAreaView} from 'react-native';
import {HeaderBack, IconButton} from '../../../shared/components';
import {styles} from './styles';
import Heart from './../../../assets/icons/heart.svg';
import Option from './../../../assets/icons/option.svg';
import {songs} from './../../../data/song';
import {SongList} from '../../../shared/components/flatlist';
import Controller from '../controller';
import ModalBottom from '../../../shared/components/modal-bottom';
import {AlbumPlayOptions} from '../../../shared/components/option-list/AlbumPlaylistOptions';

interface Props {
    navigation: any;
    route: any;
}

const PlaylistScreen: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, route} = props;
    const {newPlaylist} = route.params;
    const {name, artist, image_url} = newPlaylist;
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const handleOptionClick = () => {
        setIsVisible(true);
    };
    const handleHeartClick = () => {
        console.log('Heart Click');
    };
    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.sectionOne}
                    blurRadius={10}
                    source={{uri: image_url || ''}}>
                    <View style={styles.blurLayer} />

                    <View style={styles.backContainer}>
                        <HeaderBack />
                    </View>

                    <View style={styles.sectionOneContent}>
                        <Image
                            source={{uri: image_url || ''}}
                            style={styles.image}
                        />

                        <View style={styles.control}>
                            <View style={styles.titleGroup}>
                                <Text
                                    style={styles.playlistName}
                                    numberOfLines={1}>
                                    {name || ''}
                                </Text>
                                {artist && (
                                    <Text
                                        style={styles.artist}
                                        numberOfLines={1}>
                                        {artist}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.buttonGroup}>
                                <View style={styles.button}>
                                    <IconButton
                                        icon={Heart}
                                        onClick={handleHeartClick}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <IconButton
                                        icon={Option}
                                        onClick={handleOptionClick}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.sectionTwo}>
                    <SongList songs={songs} />
                </View>

                <Controller />
            </SafeAreaView>
            <ModalBottom
                isVisible={isVisible}
                onHide={() => setIsVisible(false)}
                item={{image_url, artist, name}}>
                <AlbumPlayOptions />
            </ModalBottom>
        </>
    );
};

export default PlaylistScreen;
