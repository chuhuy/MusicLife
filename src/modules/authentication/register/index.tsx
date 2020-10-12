/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface Props {}

const Register: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <View style={styles.container}>
                <Text>{'Register'}</Text>
            </View>
        </>
    );
};

export default Register;
