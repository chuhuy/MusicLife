export { Button } from './button';
export { FacebookButton } from './facebook-button';
export { GoogleButton } from './google-button';
export { LinkButton } from './link-button';
export { IconButton } from './icon-button';
export { SearchBar } from './search-bar';

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from './icon-button';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { styleVars } from '../constance/style-variables';

// Section Title
interface SectionTitleProps {
    title: string,
    onClick: () => void
}

export const SectionTitle: React.FunctionComponent<SectionTitleProps> = (props: SectionTitleProps) => {
    const {title, onClick} = props;

    return (
        <>
            <Pressable
                style={styles.container}
                onPress={onClick}
            >
                <Text style={styles.title}>{title}</Text>
                <ArrowRight />
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        marginRight: 10,
        fontWeight: 'bold',
    },
});

// Go Back button
interface GoBackProps {
    navigation: any
}

export const GoBackButton: React.FunctionComponent<GoBackProps> = (props: GoBackProps) => {
    const {navigation} = props;

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <View><IconButton icon={ArrowLeft} onClick={handleGoBack}/></View>
    )
}