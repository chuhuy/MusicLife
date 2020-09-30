import {
    INCREASE,
    DECREASE,
} from './actions';
import {Action} from './../../../models/redux/Action';

const initState = {
    value: 0
}

export const counterReducer = (state: any = initState, action: Action) => {
    switch(action.type) {
        case INCREASE:{
            return {
                value: state.value + 1
            };
        }
        case DECREASE:
            return {
                value: state.value - 1
            };
        default:
            return state;
    }
}