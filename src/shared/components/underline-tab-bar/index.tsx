import React from 'react';
import {styles} from './styles';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
            <View style={styles.underlineTabBar} >
                {
                    options.map(({title, type, active, onClick}, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={styles.tabButton}
                                onPress={() => onClick(type)}
                            >
                                <Text style={[styles.tabItem, active ? styles.tabActive : undefined]}>
                                    {title}
                                </Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </>
    )
}

export default UnderlineTabBar;