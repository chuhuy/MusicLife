import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from './actions';
import { signinWithEmail } from './../../../api/authentication';

function* signInWorker(action: any) {
    try {
        const response = yield call(signinWithEmail, action.payload.email, action.payload.password);
        console.log(action)
        const payload = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };
        console.log(payload);
        yield put({type: LOGIN_SUCCESS, payload});
    }
    catch (error) {
        yield put({type: LOGIN_FAILED, error});
    }
}

export function* signInWatcher() {
    yield takeLatest(LOGIN, signInWorker);
}
