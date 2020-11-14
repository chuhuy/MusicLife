import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View} from 'react-native';
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
                onPress={props.onClick}
                delayPressIn={0}
            >
                <View style={styles.touchArea}>
                    {<props.icon />}
                </View>
            </TouchableOpacity>
        </>
    );
};
