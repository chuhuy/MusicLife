/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './styles';
import I18n from './../../../i18n';
import { Button } from './../../../shared/components/button';
import { SearchBar } from './../../../shared/components';
import UserIcon from './../../../assets/icons/user.svg';
import NotificationIcon from './../../../assets/icons/notification-active.svg';
import Controller from '../controller';
import { Formik } from 'formik';
import AddPlaylistModal from './components/add-playlist-modal';

interface Props {
    navigation: any,
}

const TYPE = {
    SONG: 'SONG',
    ALBUM: 'ALBUM',
    PLAYLIST: 'PLAYLIST',
};

export const Personal: React.FunctionComponent<Props> = (props: Props) => {
    const [addPlaylistModalVisibility, setAddPlaylistVisibility] = useState<boolean>(false);
    const [isShowAll, setShowAll] = useState(true);
    const [type, setType] = useState(TYPE.SONG);

    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };
    const handleUserProfile = () => {
        props.navigation.navigate('Setting');
    };
    const handleNotification = () => {

    };
    const addPlaylist = () => {
        setAddPlaylistVisibility(true);
    };

    return (
        <>
            <View style={styles.header}>
                    <TouchableOpacity
                        delayPressOut={0}
                        onPressOut={() => handleNotification()}>
                        <NotificationIcon />
                    </TouchableOpacity>
                    <SearchBar/>
                    <TouchableOpacity
                        style={styles.userButton}
                        onPressOut={() => handleUserProfile()}>
                        <UserIcon />
                    </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.locationTitle}>
                    <TouchableOpacity
                        style={styles.locationButton}
                        activeOpacity={1}
                        onPressIn={() => {setShowAll(true);}}>
                        <Text style={isShowAll ? styles.locationTitleActive : styles.locationTitleInactive}>{I18n.translate('personal.all')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => {setShowAll(false);}}>
                        <Text style={isShowAll ? styles.locationTitleInactive : styles.locationTitleActive}>{I18n.translate('personal.device')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.typeTitle}>
                    <TouchableOpacity
                        style={styles.typeButton}
                        activeOpacity={1}
                        onPressIn={() => {setType(TYPE.SONG);}}>
                        <Text style={type === TYPE.SONG ? styles.typeTitleActive : styles.typeTitleInactive}>{I18n.translate('personal.songs')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.typeButton}
                        activeOpacity={1}
                        onPressIn={() => {setType(TYPE.ALBUM);}}>
                        <Text style={type === TYPE.ALBUM ? styles.typeTitleActive : styles.typeTitleInactive}>{I18n.translate('personal.albums')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => {setType(TYPE.PLAYLIST);}}>
                        <Text style={type === TYPE.PLAYLIST ? styles.typeTitleActive : styles.typeTitleInactive}>{I18n.translate('personal.playlists')}</Text>
                    </TouchableOpacity>
                </View>
                {type === TYPE.SONG && <></>}
                {type === TYPE.ALBUM && <></>}
                {type === TYPE.PLAYLIST &&
                <>
                    <View style={styles.body}>
                        <Button title={'+ ' + I18n.translate('personal.add-playlist')} onClick={() => addPlaylist()}/>
                    </View>
                </>}
            </View>
            <AddPlaylistModal 
                isShow={addPlaylistModalVisibility} 
                onHide={() => setAddPlaylistVisibility(false)} />
            {/* <Modal
                useNativeDriver={true}
                backdropColor={'white'}
                onBackButtonPress={() => setAddPlaylistVisibility(false)}
                onBackdropPress={() => setAddPlaylistVisibility(false)}
                backdropOpacity={0.1}
                avoidKeyboard={true}
                isVisible={addPlaylistModalVisibility}>
                <View style={styles.addPlaylistModal}>
                    <Text style={styles.modalTitle}>{I18n.translate('personal.add-playlist')}</Text>
                    <Formik
                    
                    >
                        {({values}) =>
                        <React.Fragment>
                            <TextInput></TextInput>
                        </React.Fragment>}
                    </Formik>
                </View>
            </Modal> */}
            <Controller />
        </>
    );
};
