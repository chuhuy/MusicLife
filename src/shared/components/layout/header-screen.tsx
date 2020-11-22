import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HeaderBack } from '..';
import { BaseScreen } from './base-screen';

interface Props {
    navigation: any,
    children?: any,
    title: string,
    isScroll?: boolean
}

export const HeaderScreen: React.FunctionComponent<Props> = (props: Props) => {
    const { navigation, title, children, isScroll } = props;

    return (
        <>
            <BaseScreen>
                <HeaderBack 
                    navigation={navigation}
                    title={title}
                />

                {isScroll ? (
                    <ScrollView style={styles.body}>
                        {children}
                    </ScrollView>
                ) : (
                    <View style={styles.body}>
                        {children}
                    </View>
                )}
            </BaseScreen>
        </>
    )
}

const styles = StyleSheet.create({
    body: { 
        flex: 1,
        marginTop: 30
    }
})
