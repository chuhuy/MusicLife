import {combineReducers} from 'redux';
//import module reducers here
import {authReducer} from './modules/auth/reducer';
import {counterReducer} from './modules/counter/reducer';
import {languageReducer} from './modules/i18n/reducer';

export default combineReducers({
    auth: authReducer,
    counter: counterReducer,
    language: languageReducer,
});