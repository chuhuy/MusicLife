import React from 'react';
import I18n from '../../../../i18n';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
    onClick: () => void,
    isHorizontal?: boolean
}

export const MoreButton: React.FunctionComponent<Props> = (props: Props) => {
    const {onClick, isHorizontal = false} = props;

    return (
        <>
            <Pressable 
                style={styles.buttonLayout}
                onPress={onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={styles.text}>{I18n.translate('search.more-button')}</Text> 
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    buttonLayout: {
        backgroundColor: 'transparent'
    },
    touchArea: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 30,
        borderColor: styleVars.secondaryColor,
        borderWidth: 1
    },
    text: {
        color: styleVars.secondaryColor,
        fontSize: styleVars.smallFontSize
    }
})