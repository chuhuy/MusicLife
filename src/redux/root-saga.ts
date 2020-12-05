import { all } from 'redux-saga/effects';
import { signInWatcher, signInUsernameWatcher, signInFacebookWatcher } from './modules/auth/saga';
import { getLanguageWatcher } from './modules/i18n/saga';
import { counterWatcher } from './modules/player/saga';

export function* rootSaga() {
    yield all([
        getLanguageWatcher(),

        // Sign in
        signInWatcher(),
        signInUsernameWatcher(),
        signInFacebookWatcher(),

        counterWatcher()
    ]);
}
