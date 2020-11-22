import React from 'react';
import I18n from '../../../../i18n';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';
import ArrowRight from '../../../../assets/icons/arrow-right-red.svg';

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
                <View style={[styles.touchArea, isHorizontal && styles.verticalButton]}>
                    <Text style={styles.text}>{I18n.translate('search.more-button')}</Text> 
                    <View style={isHorizontal && styles.icon}>
                        <ArrowRight />
                    </View>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    buttonLayout: {
        backgroundColor: 'transparent',
    },
    verticalButton: {
        flexDirection: 'column-reverse',
        borderColor: 'transparent',
        borderWidth: 0,
        height: 110
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
    icon: {
        width: 20,
        height: 20,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: styleVars.secondaryColor,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
