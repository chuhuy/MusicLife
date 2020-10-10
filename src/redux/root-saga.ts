import { all } from 'redux-saga/effects';
import { getLanguageWatcher } from './modules/i18n/saga';

export function* rootSaga() {
    yield all([
        getLanguageWatcher(),
    ])
}