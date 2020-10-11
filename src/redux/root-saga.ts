import { all } from 'redux-saga/effects';
import { signInWatcher } from './modules/auth/saga';
import { getLanguageWatcher } from './modules/i18n/saga';

export function* rootSaga() {
    yield all([
        getLanguageWatcher(),
        signInWatcher(),
    ]);
}
