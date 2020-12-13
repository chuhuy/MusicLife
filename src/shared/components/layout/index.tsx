import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Controller from '../../../modules/home/controller'
import { styleVars } from '../../constance/style-variables'

interface Props {
    children?: any,
    isScroll?: boolean
}

export const BaseScreen: React.FunctionComponent<Props> = (props: Props) => {
    const { children, isScroll } = props;

    return (
        <>
            <SafeAreaView style={styles.view}>
                {isScroll ? (
                    <ScrollView
                        contentContainerStyle={styles.container}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.container, styles.viewContainer]}>
                        {children}
                    </View>
                )}

                <Controller />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    viewContainer: {
        flex: 1,
    },
});
