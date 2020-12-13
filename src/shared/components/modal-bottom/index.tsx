import React from 'react';
import { Image, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { IconButton } from '../icon-button';
import ArrowDown from './../../../assets/icons/arrow-down.svg';
import { styles } from './styles';

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
                    {item ? (
                        <View style={styles.headerLeft}>
                            {item.header ? (
                                <Text style={[styles.title, styles.headerTitle]} numberOfLines={1}>
                                    {item.header}
                                </Text>
                            ) : (
                                <>
                                    <Image
                                        source={{uri: item.image_url}}
                                        style={styles.image}
                                    />
                                    <View style={{
                                        flex: 1,
                                        marginLeft: 15,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.title} numberOfLines={1}>
                                            {item.title || item.name}
                                        </Text>
                                        {item.artists && (
                                            <Text style={styles.artist} numberOfLines={1}>
                                                {item.artists}
                                            </Text>
                                        )}
                                    </View>
                                </>
                            )}
                        </View>
                    ) : null}

                    <IconButton
                        onClick={onHide}
                        icon={ArrowDown}
                    />
                </View>

                <View style={styles.main}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default ModalBottom;
