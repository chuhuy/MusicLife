import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Previous from './../../../../assets/icons/previous.svg';
import Next from './../../../../assets/icons/next.svg';
import { styleVars } from './../../../../shared/constance/style-variables';

interface Props {
    type: 'previous' | 'next',
    onClick: () => void
}

const PreviousNextButton: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Pressable
                style={styles.container}
                onPress={props.onClick}>
                {props.type === 'previous' ? <Previous width={20} height={20}/> : <Next width={20} height={20}/>}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: styleVars.lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
    },
});

export default PreviousNextButton;
