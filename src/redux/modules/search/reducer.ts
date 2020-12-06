import {Action} from './../../../models/redux/Action';
import { SEARCH } from './actions';

const initState = {
    keyword: ''
};

export const searchReducer = (state: any = initState, action: Action) => {
    switch (action.type) {
        case SEARCH: 
            return {
                keyword: action.payload
            }
        default:
            return state;
    }
};
