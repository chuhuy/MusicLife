import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Artist } from '../../../../models/artist';
import { styleVars } from '../../../../shared/constance/style-variables';

interface ArtistProps {
    onClick: () => void,
    id: number,
    name: string,
    image_url: string,
    isHorizontal?: boolean,
}

const ArtistItem: React.FunctionComponent<ArtistProps> = (props: ArtistProps) => {
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
    )
}

interface ArtistListProps {
    navigation: any,
    isHorizontal?: boolean,
    artist: Array<Artist>
}

export const ArtistList: React.FunctionComponent<ArtistListProps> = (props: ArtistListProps) => {
    const {navigation, isHorizontal = true, artist} = props;

    const onChangeArtistScreen = (artist: Artist) => {
        navigation.navigate('Singer', {artist});
    }

    const renderArtistItem = (item: Artist) => {
        return (
            <ArtistItem 
                key={item.id}
                id={item.id}
                name={item.name}
                image_url={item.image_url}
                onClick={() => onChangeArtistScreen(item)}
                isHorizontal={isHorizontal}
            /> 
        )
    }
    
    return (
        <>
            {
                isHorizontal ? 
                    <FlatList 
                        contentContainerStyle={styles.artistListHorizontal}
                        horizontal={isHorizontal}
                        data={artist}
                        renderItem={({item}) => renderArtistItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                    /> :
                    <ScrollView style={styles.artistListVertical} >
                        {artist.map((item) => renderArtistItem(item))}
                    </ScrollView>
            }
            
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    verticalItem: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    horizontalItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    artistListHorizontal: {
        marginHorizontal: -15
    },
    artistListVertical: {
        marginVertical: -10,
    },
    artistImage: {
        width: 70,
        height: 70,
        borderRadius: 70
    },
    artistImageVertical: {
        width: 55,
        height: 55,
        borderRadius: 55
    },
    artistName: {
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginTop: 5,
    }, 
    artistNameVertical: {
        flex: 1,
        color: styleVars.white,
        fontSize: styleVars.baseFontSize,
        marginLeft: 15
    }
})