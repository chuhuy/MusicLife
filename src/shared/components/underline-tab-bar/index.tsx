import React from 'react';
import {styles} from './styles';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    options: Array<{
        title: string,
        type: string,
        active: boolean,
        onClick: (type: string) => void
    }>
}

const UnderlineTabBar: React.FunctionComponent<Props> = (props: Props) => {
    const {options} = props;

    return (
        <>
            <View style={styles.underlineTabBar}>
                {
                    options.map(({title, type, active, onClick}, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.tabButton}
                                activeOpacity={1}
                                delayPressIn={0}
                                onPressIn={() => onClick(type)}
                            >
                                <Text style={[styles.tabItem, active ? styles.tabActive : undefined]}>
                                    {title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </>
    )
}

export default UnderlineTabBar