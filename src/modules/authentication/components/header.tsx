import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowBack from '../../../assets/icons/arrow-back.svg';

interface Props{
    goBack: () => void
}

const Header: React.FunctionComponent<Props> = ({ goBack }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPressOut={ goBack }
                delayPressIn={0}
            >
                <ArrowBack width={15} height={26} />
            </TouchableOpacity>
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