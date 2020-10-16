import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ArrowRight from './../../../../assets/icons/arrow-right.svg';

interface Props {
    title: string,
    onClick: () => void
}

export const SectionTitle: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPressOut={props.onClick}>
                <Text style={styles.title}>{props.title}</Text>
                <ArrowRight />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
        marginRight: 10,
        fontWeight: 'bold',
    },
});
