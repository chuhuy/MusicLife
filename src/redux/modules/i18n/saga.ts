import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_CURRENT_LANGUAGE, GET_CURRENT_LANGUAGE_FAILURE, GET_CURRENT_LANGUAGE_SUCCESS } from './actions';
import { getLanguage } from '../../../i18n/utils';

function* getLanguageWorker() {
    try {
        const language = yield call(getLanguage);
        const payload = {
            language: language,
        };
        yield put({type: GET_CURRENT_LANGUAGE_SUCCESS, payload});
    }
    catch (error) {
        console.log(error);
        yield put({type: GET_CURRENT_LANGUAGE_FAILURE, error});
    }
}

export function* getLanguageWatcher() {
    yield takeLatest(GET_CURRENT_LANGUAGE, getLanguageWorker);
}
