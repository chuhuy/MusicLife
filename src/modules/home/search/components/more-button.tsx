import React from 'react';
import I18n from '../../../../i18n';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';
import ArrowRight from '../../../../assets/icons/arrow-right-red.svg';

interface Props {
    onClick: () => void,
}

export const MoreButton: React.FunctionComponent<Props> = (props: Props) => {
    const { onClick } = props;

    return (
        <>
            <Pressable 
                style={styles.buttonLayout}
                onPress={onClick}
            >
                <View style={styles.touchArea}>
                    <Text style={styles.text}>{I18n.translate('search.more-button')}</Text> 
                    <ArrowRight />
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    buttonLayout: {
        backgroundColor: 'transparent',
    },
    touchArea: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 30,
        borderColor: styleVars.secondaryColor,
        borderWidth: 1
    },
    text: {
        alignSelf: 'center',
        color: styleVars.secondaryColor,
        fontSize: styleVars.smallFontSize,
        paddingHorizontal: 8
    },
})
