import React from 'react';
import { View, Image } from 'react-native';
import { IconButton } from '../../../shared/components';
import { styles } from './styles';
import ArrowLeft from './../../../assets/icons/arrow-left.svg';

interface Props {
    navigation: any
}

const Playlist: React.FunctionComponent<Props> = (props: Props) => {

    const handleBack = () => {
        props.navigation.goBack();
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.sectionOne}>

                </View>
                <View style={styles.sectionTwo}>

                </View>
                {/* <Image source={{uri: 'https://i.ytimg.com/vi/VQS_Gj9d028/maxresdefault.jpg'}} style={styles.backgroundImage}/> */}
                {/* <View style={styles.header}>
                    <IconButton icon={ArrowLeft} onClick={() => handleBack()}/>
                </View> */}
            </View>
        </>
    );
};

export default Playlist;
