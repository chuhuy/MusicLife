import React, {FunctionComponent} from 'react';
import { TouchableOpacity} from 'react-native';
import { styles } from './styles';
import GoogleIcon from '../../../assets/icons/google-plus.svg';

interface Props {
    onClick: () => void;
}

export const GoogleButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
                delayPressIn={0}
                style={styles.container}
                onPressOut={props.onClick}
            >
                <GoogleIcon width={50} height={50} />
            </TouchableOpacity>
        </>
    );
};
