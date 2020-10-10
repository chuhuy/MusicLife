import { GET_CURRENT_LANGUAGE, GET_CURRENT_LANGUAGE_SUCCESS, GET_CURRENT_LANGUAGE_FAILURE } from './actions';
import { Action } from './../../../models/redux/Action';
import I18n from 'react-native-i18n';

const initState = {
    language: 'en',
};

export const languageReducer = (state: any = initState, action: Action) => {
    switch (action.type) {
        case GET_CURRENT_LANGUAGE:
            return state;
        case GET_CURRENT_LANGUAGE_SUCCESS:
            I18n.locale = action.payload.language;
            return {
                language: action.payload.language,
            };
        case GET_CURRENT_LANGUAGE_FAILURE:
            return state;
        default:
            return state;

    }
};
