import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

interface Props {
    options: Array<{
        title: string,
        type: number,
        onClick: (type: number) => void
    }>,
    activeTab: number
}

const UnderlineTabBar: React.FunctionComponent<Props> = (props: Props) => {
    const {options, activeTab} = props;

    return (
        <>
            <View style={styles.underlineTabBar} >
                {
                    options.map(({title, type, onClick}, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={styles.tabButton}
                                onPress={() => onClick(type)}
                            >
                                <Text style={[styles.tabItem, activeTab === type ? styles.tabActive : undefined]}>
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