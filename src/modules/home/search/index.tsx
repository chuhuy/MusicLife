import React, { useState } from 'react';
import {SearchBar} from '../../../shared/components/search-bar';
import { View, Text, FlatList, ImageBackground,TouchableOpacity } from 'react-native';
import { styles } from './style';
import { songs } from './../../../data/song';
import { artises} from './../../../data/artist';
import ArrowBack from './../../../assets/icons/arrow-back.svg';
import { IconButton } from '../../../shared/components';
import { useNavigation } from '@react-navigation/native';
import { SongItem } from './components';

interface Props {
    navigation: any,
    route: any,
}

export const Search: React.FunctionComponent<Props> = (props: Props) => {
    const handleBack = () => {
        props.navigation.goBack();
    };
    
    const navigation = useNavigation();
    
    const handlePlayMusic = () => {
        props.navigation.navigate('Player');
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const fintS
    return (
        <>   
           <View style ={styles.container}>
                <View style={styles.header}>
                        <TouchableOpacity>
                            <IconButton icon={ArrowBack} onClick={() => handleBack()} />
                        </TouchableOpacity>
                        <SearchBar/>
                </View>

                <View style={styles.song}>
                    <Text h1>Song</Text>
                    <FlatList
                        data={songs}
                        renderItem={({item}) => (<SongItem title={item.title} artist={item.artists[0].name} image={item.image_url} onOptionClick={() => handleOpenOption()} onClick={() => handlePlayMusic()}/>)}
                        keyExtractor={item => item.id.toString()}
                        maxToRenderPerBatch
                    />
                </View>
               {/*  <Text h1>Artis</Text>
                <View style={styles.artis}>
                    <FlatList
                        data={songs}
                        renderItem={({item}) => (<SongItem  artist={item.artists[0].name}/>)}
                    />
                </View> */}
            </View>
        </>
    );
};
export default Search;