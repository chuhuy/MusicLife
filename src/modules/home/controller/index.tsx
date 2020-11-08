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
import { Song } from '../../../models/song';
import { SKIP } from '../../../redux/modules/player/actions';
import { connect } from 'react-redux';


interface Props extends DispatchProps{}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveSongToStore: (song: Song) => dispatch({type: SKIP, payload: song}),
    };
};

const Controller: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();

    const dummySong: Song = {
        id: '1',
        url: 'https://f9-stream.nixcdn.com/NhacCuaTui1005/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3?st=cb28yaeTP3YF8rW-P4ZfTw&e=1604910600&t=1604824200459',
        title: 'Trên tình bạn dưới tình yêu',
        artist: 'Min',
        image_url: 'https://cuoifly.tuoitre.vn/820/0/ttc/r/2020/11/05/toa23-1604590587.jpg',
    };
    const [isPlaying, setPlaying] = useState<boolean>(true);
    const handlePrevious = () => {};
    const handlePlayPause = () => {};
    const handleNext = () => {};
    const handleOnClick = () => {
        props.saveSongToStore(dummySong)
        navigation.navigate('Player');
    };

    return (
        <TouchableOpacity
            style={styles.view}
            activeOpacity={1}
            onPress={() => handleOnClick()}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.image} source={{uri: dummySong.image_url}}/>
                    <View style={styles.titleGroup}>
                        <Text style={styles.song}>{dummySong.title}</Text>
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

export default connect(null, mapDispatchToProps)(Controller);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
