import React, { FunctionComponent } from 'react';
import { Pressable, View} from 'react-native';
import { styles } from './styles';
import { SvgProps } from 'react-native-svg';

interface Props {
    onClick: () => void
    icon: React.FC<SvgProps>
}

export const IconButton: FunctionComponent<Props> = (props: Props) => {
    const {onClick} = props;
    
    return (
        <>
            <Pressable
                style={styles.container}
                onPressOut={onClick}
            >
                <View style={styles.touchArea}>
                    {<props.icon />}
                </View>
            </Pressable>
        </>
    );
};
