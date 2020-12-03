export { Button } from './button';
export { FacebookButton } from './facebook-button';
export { GoogleButton } from './google-button';
export { LinkButton } from './link-button';
export { IconButton } from './icon-button';
export { SearchBar } from './search-bar';
export * from './flatlist';
export * from './layout';

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from './icon-button';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { styleVars } from '../constance/style-variables';
import { useNavigation } from '@react-navigation/native';

// Section Title
interface SectionTitleProps {
    title: string,
    onClick?: () => void
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
        fontWeight: '700',
    },
    headerBackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: styleVars.greyColor,
        marginHorizontal: -15,
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    headerTitle: {
        flex: 1,
        color: styleVars.white,
        textAlign: 'center',
        fontSize: styleVars.largeFontSize,
        letterSpacing: 1,
        fontWeight: '700',
    },
});

// Go Back Header
interface HeaderBackProps {
    title?: string,
}

export const HeaderBack: React.FunctionComponent<HeaderBackProps> = (props: HeaderBackProps) => {
    const {title} = props;
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <View style={[title && styles.headerBackContainer]}>
            <IconButton 
                icon={ArrowLeft} 
                onClick={handleGoBack} 
            />
            {title && <Text style={styles.headerTitle}>{title}</Text>}
        </View>
    )
}

export const LoadingLayer: React.FC = () => {
    return (
        <View style={{backgroundColor: '#fff'}}><Text>Loading...</Text></View>
    )
}
