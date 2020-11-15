import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { IconButton } from '../../../../shared/components';
import Option from './../../../../assets/icons/option.svg';
import { styleVars } from './../../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

interface Props {
    onOptionClick: () => void
    onClick: () => void
    image: string
    title: string
    artist: string
}

export const SongItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.touchAreaOne}
                onPressOut={() => props.onClick()}>
                    <View style={styles.metadata}>
                        <Image source={{uri: props.image}} style={styles.image}/>
                        <View style={styles.titleGroup}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.artist}>{props.artist}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.touchAreaTwo}>
                    <IconButton icon={Option} onClick={() => props.onOptionClick()}/>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 40,
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,
    },
    metadata: {
        flex: 1,
        flexDirection: 'row',
    },
    touchAreaOne: {
        flex: 1,
    },
    touchAreaTwo: {
        justifyContent: 'center',
        marginRight: 10,
    },
    image: {
        height: 45,
        width: 45,
    },
    titleGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    artist: {
        color: styleVars.greyColor,
        fontSize: 13,
    },
});
