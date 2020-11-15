import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View, Pressable } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';

const { width } = Dimensions.get('window');

interface Props {
    title: string,
    onClick: () => void,
    image: string
}

export const GenreItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <View style={styles.container}>
                <Pressable
                    style={styles.contentContainer}
                    onPress={props.onClick}
                >
                    <Image style={styles.image} source={{uri: props.image}}/>
                    <View style={styles.mask}/>
                    <Text style={styles.title}>{props.title}</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 7.5
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: '100%',
        borderRadius: 10,
    },
    title: {
        fontSize: styleVars.bigFontSize,
        fontWeight: 'bold',
        color: styleVars.white,
        position: 'absolute',
        bottom: 5,
    },
    mask: {
        position: 'absolute',
        height: 100,
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.6,
    },
});
