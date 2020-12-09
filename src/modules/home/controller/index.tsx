/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import { connect } from 'react-redux';
import { IconButton } from '../../../shared/components';
import { Screen } from '../../../shared/constance/screen';
import { handleNext, handlePrevious, togglePlay } from '../../../shared/helper/player';
import NextIcon from './../../../assets/icons/next-active.svg';
import PauseIcon from './../../../assets/icons/pause-active.svg';
import PlayIcon from './../../../assets/icons/play-active.svg';
import PreviousIcon from './../../../assets/icons/previous-active.svg';
import { styles } from './styles';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    player: state.player,
});

const Controller: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    
    const {player} = props;

    const {isPlaying, songs, songIndex} = player;
    const {position, duration} = useTrackPlayerProgress(500);
    
    const handleOnClick = async () => {
        if (songs.length) {
            navigation.navigate(Screen.Common.Player, {
                currentTime: position && duration ? position/duration : 0
            });
        }
    };

    return songs.length ? (
        <Pressable
            style={styles.view}
            onPress={handleOnClick}
        >
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.image} source={{uri: songs[songIndex].image_url}}/>
                    
                    <View style={styles.titleGroup}>
                        <Text style={styles.song} numberOfLines={1}>{songs[songIndex].title}</Text>
                        <Text style={styles.artist} numberOfLines={1}>{songs[songIndex].artists}</Text>
                    </View>
                </View>

                <View style={[styles.buttonGroup]}>
                    <View style={styles.button}>
                        <IconButton icon={PreviousIcon} onClick={handlePrevious}/>
                    </View>

                    <View style={styles.button}>
                        <IconButton icon={isPlaying ? PauseIcon : PlayIcon} onClick={togglePlay}/>
                    </View>

                    <View style={styles.button}>
                        <IconButton icon={NextIcon} onClick={handleNext}/>
                    </View>
                </View>
            </View>
        </Pressable>
    ) : null;
};

export default connect(mapStateToProps, null)(Controller);
type StateProps = ReturnType<typeof mapStateToProps>;
