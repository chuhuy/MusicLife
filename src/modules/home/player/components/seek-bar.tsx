import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from 'react-native-slider';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import TrackPlayer from 'react-native-track-player';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
    currentTime?: number
}

const SeekBar: React.FC<Props> = (props: Props) => {
    const {currentTime} = props;

    const {position, duration} = useTrackPlayerProgress(500);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(currentTime || 0);

    useEffect(() => {
        if (!isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    const slidingStarted = () => {
        console.log('slide')
        setIsSeeking(true);
    }

    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
        setIsSeeking(false);
    };

    return (
        <>
            {sliderValue !== null && (
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        value={sliderValue}
                        minimumTrackTintColor={styleVars.secondaryColor}
                        maximumTrackTintColor={styleVars.lightPrimaryColor}
                        thumbTintColor={styleVars.white}
                        onSlidingStart={slidingStarted}
                        onSlidingComplete={slidingCompleted}
                    />
                </View>
            )}
        </>
    );
}

export default SeekBar;

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    slider: {
        flex: 1
    }
})
