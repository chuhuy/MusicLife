/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { styles } from './styles';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PreviousIcon from './../../../assets/icons/previous-active.svg';
import NextIcon from './../../../assets/icons/next-active.svg';
import PlayIcon from './../../../assets/icons/play.svg';
import PauseIcon from './../../../assets/icons/pause-active.svg';
import { IconButton } from '../../../shared/components';
import { useNavigation } from '@react-navigation/native';


interface Props {}

const Controller: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();

    const dummySong = {
        id: 1,
        image: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg',
        name: 'Anh đâu đấy',
        artist: 'Huy Chu',
    };
    const [isPlaying, setPlaying] = useState<boolean>(true);
    const handlePrevious = () => {};
    const handlePlayPause = () => {};
    const handleNext = () => {};
    const handleOnClick = () => {
        navigation.navigate('Player');
    };

    return (
        <TouchableOpacity
            style={styles.view}
            activeOpacity={1}
            onPress={() => handleOnClick()}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.image} source={{uri: dummySong.image}}/>
                    <View style={styles.titleGroup}>
                        <Text style={styles.song}>{dummySong.name}</Text>
                        <Text style={styles.artist}>{dummySong.artist}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.button}>
                        <IconButton icon={PreviousIcon} onClick={() => handlePrevious()}/>
                    </View>
                    <View style={styles.button}>
                        <IconButton icon={isPlaying ? PauseIcon : PlayIcon} onClick={() => handlePlayPause()}/>
                    </View>
                    <View style={styles.button}>
                        <IconButton icon={NextIcon} onClick={() => handleNext()}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Controller;
