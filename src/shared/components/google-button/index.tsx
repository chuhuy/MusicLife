import React, {FunctionComponent} from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';
import GoogleIcon from '../../../assets/icons/google-plus.svg';

interface Props {
    onClick: () => void;
}

export const GoogleButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Pressable
                style={styles.container}
                onPress={props.onClick}
            >
                <GoogleIcon width={50} height={50} />
            </Pressable>
        </>
    );
};
