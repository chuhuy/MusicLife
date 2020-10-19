import React, { FunctionComponent } from 'react';
import { TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { SvgProps } from 'react-native-svg';

interface Props {
    onClick: () => void
    icon: React.FC<SvgProps>
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
