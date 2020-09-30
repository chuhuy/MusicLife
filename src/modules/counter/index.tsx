import React from 'react';
import { Text, View } from 'react-native';
import {styles} from './styles';
import {Button} from './../../shared/components';
import {connect} from 'react-redux';
import {INCREASE, DECREASE} from './../../redux/modules/counter/actions';

interface Props extends StateProps, DispatchProps{

}

const mapStateToProps = (state: any) => ({
    counter: state.counter.value
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        increase: () => dispatch({type: INCREASE}),
        decrease: () => dispatch({type: DECREASE})
    }
}

const CounterScreen: React.FunctionComponent<Props> = (props: Props) => {

    const handleIncrease = () => {
        props.increase();
    }

    const handleDecrease = () => {
        props.decrease();
    }

    return (
        <>
            <View style={styles.container}>
                <Text>{props.counter}</Text>
                <Button title="Increase" onClick={handleIncrease} />
                <Button title="Decrease" onClick={handleDecrease} />
            </View>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterScreen)

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
