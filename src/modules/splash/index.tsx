/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { GET_CURRENT_LANGUAGE } from './../../redux/modules/i18n/actions';


interface Props extends DispatchProps {
    navigation: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCurrentLanguage: () => dispatch({type: GET_CURRENT_LANGUAGE}),
    };
};

const SplashScreen: React.FunctionComponent<Props> = (props: Props) => {
    useEffect(() => {
        props.getCurrentLanguage();
        const timer = setTimeout(() => {
            props.navigation.navigate('Login');
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <View style={styles.container}>
                <Text>Splash Screen</Text>
            </View>
        </>
    );
};

export default connect(null, mapDispatchToProps)(SplashScreen);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
