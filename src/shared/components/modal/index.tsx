import React from 'react';
import DefaultModal from 'react-native-modal';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface Props {
    isVisible: boolean,
    title: string,
    children: any,
    onHide: () => void,
    avoidKeyBoard?: boolean
}

const Modal: React.FunctionComponent<Props> = (props: Props) => {
    const { isVisible, title, children, avoidKeyBoard, onHide } = props;
    
    return (
        <>
            <DefaultModal 
                useNativeDriver={true}
                // style={styles.modalLayout}
                avoidKeyboard={avoidKeyBoard}
                onBackButtonPress={onHide}
                onBackdropPress={onHide}
                isVisible={isVisible} 
                backdropOpacity={0.5}
            >
                <View style={[styles.modalContainer]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>
                    {isVisible && children}
                </View>
            </DefaultModal>
        </>
    )
}

export default Modal;