import React from 'react';
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
    onClick: () => void,
    id: number,
    name: string,
    image_url: string,
    isHorizontal?: boolean,
}

const ArtistItem: React.FunctionComponent<Props> = (props: Props) => {
    const {onClick, name, isHorizontal, image_url} = props;
    
    return (
        <>
            <Pressable
                style={[styles.itemContainer, isHorizontal ? styles.horizontalItem : styles.verticalItem]}
                onPress={onClick}
            >
                <Image
                    source={{uri: image_url}}
                    style={isHorizontal ? styles.artistImage : styles.artistImageVertical}
                />
                <Text
                    style={isHorizontal ? styles.artistName : styles.artistNameVertical}
                    numberOfLines={1}
                >
                    {name}
                </Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalItem: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    horizontalItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    artistImage: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    artistImageVertical: {
        width: 55,
        height: 55,
        borderRadius: 55,
    },
    artistName: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginTop: 10,
    },
    artistNameVertical: {
        flex: 1,
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginLeft: 15,
    },
});

export default ArtistItem;
