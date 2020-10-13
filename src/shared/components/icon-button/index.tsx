import React, {FunctionComponent} from 'react';
import { TouchableOpacity} from 'react-native';
import { styles } from './styles';

interface Props {
    onClick: () => void
    icon: React.Component
}

export const IconButton: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <TouchableOpacity
            style={styles.container}
            onPressOut={props.onClick}>
                {<props.icon />}
            </TouchableOpacity>
        </>
    );
};
