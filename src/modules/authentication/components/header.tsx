import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import ArrowBack from '../../../assets/icons/arrow-back.svg';

interface Props{
    goBack: () => void
}

const Header: React.FunctionComponent<Props> = ({ goBack }) => {
    return (
        <View style={styles.headerContainer}>
            <Pressable
                onPressOut={ goBack }
            >
                <ArrowBack width={15} height={26} />
            </Pressable>
            <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/>        
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 30
    },
    logo:{
        alignSelf: 'center',
        width: 40,  
        height: 48,
        marginTop: 15
    }
})