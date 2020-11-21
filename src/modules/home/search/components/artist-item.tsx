import React from 'react';
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
    onClick: () => void,
    id: number,
    name: string,
    image_url: string
}

export const ArtistItem: React.FunctionComponent<Props> = (props: Props) => {
    const {onClick, name, image_url} = props;
    
    return (
        <>
            <Pressable 
                style={styles.container}
                onPress={onClick}
            >
                <Image source={{uri: image_url}} style={styles.artistImage}/>
                <Text style={styles.artistName} numberOfLines={1} >{name}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    artistImage: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    artistName: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginTop: 5,
    }
})
