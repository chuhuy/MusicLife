import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import ArrowDownOrange from './../../../assets/icons/arrow-down-orange.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
    isVisible: boolean;
    children: any;
    onHide: () => void;
    item: any;
}

const ModalBottom: React.FunctionComponent<Props> = (props: Props) => {
    const {isVisible, onHide, item, children} = props;

    return (
        <Modal
            isVisible={isVisible}
            coverScreen={true}
            onBackButtonPress={onHide}
            onBackdropPress={onHide}
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    {item && (
                        <View style={styles.headerLeft}>
                            <Image
                                source={{uri: item.image_url}}
                                style={styles.image}
                            />
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.title}>
                                    {item.title || item.name}
                                </Text>
                                {item.artists && (
                                    <Text style={styles.artist}>
                                        {item.artists}
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}
                    <Pressable onPressOut={onHide}>
                        <ArrowDownOrange />
                    </Pressable>
                </View>
                <View style={styles.main}>
                    <View style={styles.options}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalBottom;
