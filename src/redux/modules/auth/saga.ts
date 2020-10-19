import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_EMAIL, LOGIN_USERNAME, loginSuccess, loginFailed } from './actions';
import { signinWithEmail, signinWithUsername } from './../../../api/authentication';

// Login email
function* signInWorker(action: any) {
    try {
        const response = yield call(signinWithEmail, action.payload.email, action.payload.password);
        console.log(action)
        const payload = {
            username: response.data.username,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };
        console.log(payload);
        yield put(loginSuccess(payload));
    }
    catch (error) {
        yield put(loginFailed(error));
    }
}

export function* signInWatcher() {
    yield takeLatest(LOGIN_EMAIL, signInWorker);
}

// Login username
function* signInUsenameWorker(action: any) {
    try {
        const response = yield call(signinWithUsername, action.payload.username, action.payload.password);
        console.log(action)
        const payload = {
            username: response.data.username,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };
        console.log(payload);
        yield put(loginSuccess(payload));
    }
    catch (error) {
        yield put(loginFailed(error));
    }
}

export function* signInUsernameWatcher() {
    yield takeLatest(LOGIN_USERNAME, signInUsenameWorker);
}
