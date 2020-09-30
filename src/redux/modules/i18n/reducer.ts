import { CHANGE_LANGUAGE } from './actions';
import { Action } from './../../../models/redux/Action';

const initState = {
    language: 'en'
};

export const languageReducer = (state: any = initState, action: Action) => {
    switch(action.type) {
        case CHANGE_LANGUAGE:
            return {
                language: action.payload
            };
        default: 
            return state;

    }
}