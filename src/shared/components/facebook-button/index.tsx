import React, {FunctionComponent} from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';
import FacebookIcon from '../../../assets/icons/facebook.svg';

interface Props {
    onClick: () => void;
}

export const FacebookButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Pressable
                style={styles.container}
                onPressIn={props.onClick}
            >
                <FacebookIcon width={50} height={50} />
            </Pressable>
        </>
    );
};
