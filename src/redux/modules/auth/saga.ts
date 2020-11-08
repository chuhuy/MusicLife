import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_EMAIL, LOGIN_USERNAME, loginSuccess, loginFailed, LOGIN_FACEBOOK } from './actions';
import { signinWithEmail, signinWithUsername, signinWithFacebook } from './../../../api/authentication';
import { saveTokenToLocalStorage } from './../../../shared/helper/authentication';

// Login email
function* signInWorker(action: any) {
    try {
        const response = yield call(signinWithEmail, action.payload.email, action.payload.password);
        if (response.status){
            const payload = {
                username: response.data.username,
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
            };
            yield call(saveTokenToLocalStorage, payload.refresh_token);
            yield put(loginSuccess(payload));
        } else {
            const { errorMessage } = response;
            yield call(action.payload.callbacks.onFailed, errorMessage);
            yield (loginFailed(errorMessage));
        }
    }
    catch (error) {
        yield call(action.payload.callbacks.onFailed, error);
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
        console.log(action);
        if (response.status){
            const payload = {
                username: response.data.username,
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
            };

            yield put(loginSuccess(payload));
        } else {
            const { errorMessage } = response;
            yield call(action.payload.callbacks.onFailed, errorMessage);
            yield (loginFailed(errorMessage));
        }
    }
    catch (error) {
        yield call(action.payload.callbacks.onFailed, error);
        yield put(loginFailed(error));
    }
}

export function* signInUsernameWatcher() {
    yield takeLatest(LOGIN_USERNAME, signInUsenameWorker);
}

// Login Facebook
function* signInFacebookWorker(action: any) {
    try {
        const response = yield call(signinWithFacebook, action.payload.access_token);

        console.log(action);
        if (response.status){
            const payload = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
            };

            yield put(loginSuccess(payload));
        } else {
            const { errorMessage } = response;
            yield call(action.payload.callbacks.onFailed, errorMessage);
            yield (loginFailed(errorMessage));
        }
    }
    catch (error) {
        yield call(action.payload.callbacks.onFailed, error);
        yield put(loginFailed(error));
    }
}

export function* signInFacebookWatcher() {
    yield takeLatest(LOGIN_FACEBOOK, signInFacebookWorker);
}
