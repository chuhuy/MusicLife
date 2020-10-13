import React, {FunctionComponent} from 'react';
import { TouchableOpacity} from 'react-native';
import { styles } from './styles';
import FacebookIcon from '../../../assets/icons/facebook.svg';

interface Props {
    onClick: () => void;
}

export const FacebookButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPressOut={props.onClick}
            >
                <FacebookIcon width={45} height={45} />
            </TouchableOpacity>
        </>
    );
};
