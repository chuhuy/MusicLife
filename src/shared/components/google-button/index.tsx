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
                style={styles.container}
                onPressOut={props.onClick}
            >
                <GoogleIcon width={45} height={45} />
            </TouchableOpacity>
        </>
    );
};
