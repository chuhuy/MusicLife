import React from 'react';
import DefaultModal from 'react-native-modal';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleVars } from '../../constance/style-variables';

interface Props {
    isVisible: boolean,
    title: string,
    children: any,
    footerButtons: Array<{
        title: string,
        onPressOut: () => void,
        isActive?: boolean
    }>
}

const Modal: React.FunctionComponent<Props> = (props: Props) => {
    const { isVisible, title, children, footerButtons } = props;
    
    return (
        <>
            <View style={styles.modalContainer}>
                <DefaultModal style={styles.modalLayout} isVisible={isVisible} hasBackdrop={true}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>
                    <View style={styles.modalBody}>
                        {
                            children
                        }
                    </View>
                    <View style={styles.modalFooter}>
                        {
                            footerButtons.map(({title, onPressOut, isActive}) => {
                                return (
                                    <TouchableOpacity 
                                        onPressOut={onPressOut} 
                                        disabled={!isActive}
                                        style={styles.modalFooterButton}
                                    >
                                        <Text style={[
                                                styles.modalFooterText, 
                                                {color : isActive ? styleVars.secondaryColor : styleVars.greyColor}
                                            ]}
                                        >
                                            {title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })    
                        }
                    </View>
                </DefaultModal>
            </View>
        </>
    )
}

export default Modal;