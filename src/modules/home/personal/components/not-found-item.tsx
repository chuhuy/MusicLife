import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styleVars } from '../../../../shared/constance/style-variables';

interface Props {
    icon: SVGElement,
    text: string
}

const NotFoundItem: React.FunctionComponent<Props> = (props: Props) => {
    const {icon, text} = props;

    return (
        <>
            <View style={styles.notFoundContainer}>
                {icon}
                <Text style={styles.notFoundText}>{text}</Text>
            </View>
        </>
    )
}

export default NotFoundItem;

const styles = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFoundText: {
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
        paddingTop: 15
    }
})