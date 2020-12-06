import { combineReducers } from 'redux';
//import module reducers here
import { authReducer } from './modules/auth/reducer';
import { languageReducer } from './modules/i18n/reducer';
import { playerReducer } from './modules/player/reducer';
import { searchReducer } from './modules/search/reducer';

export default combineReducers({
    auth: authReducer,
    language: languageReducer,
    player: playerReducer,
    search: searchReducer
});
