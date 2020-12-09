/* eslint-disable @typescript-eslint/no-unused-vars */
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN_EMAIL,
  LOGIN_USERNAME,
  loginSuccess,
  loginFailed,
  LOGIN_FACEBOOK,
  FETCH_CURRENT_USER,
  fetchUserSuccess,
  fetchUserFailed,
  refreshTokenSuccess,
  refreshTokenFailed,
  REFRESH_TOKEN,
} from './actions';
import {
  signinWithEmail,
  signinWithUsername,
  signinWithFacebook,
  me,
  token,
} from './../../../api/authentication';
import {saveTokenToLocalStorage} from './../../../shared/helper/authentication';

// Login email
function* signInWorker(action: any) {
  try {
    const response = yield call(
      signinWithEmail,
      action.payload.email,
      action.payload.password,
    );
    if (response.status) {
      const payload = {
        username: response.data.username,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        display_name: response.data.display_name,
        image_url: response.data.image_url,
        default_avatar: response.data.default_avatar,
      };
      yield call(saveTokenToLocalStorage, payload.refresh_token);
      yield put(loginSuccess(payload));
    } else {
      const {errorMessage} = response;
      yield call(action.payload.callbacks.onFailed, errorMessage);
      yield loginFailed(errorMessage);
    }
  } catch (error) {
    yield call(action.payload.callbacks.onFailed, error);
    yield put(loginFailed(error));
  }
}

export function* signInWatcher() {
  yield takeLatest(LOGIN_EMAIL, signInWorker);
}

// Login username
function* signInUsernameWorker(action: any) {
  try {
    const response = yield call(
      signinWithUsername,
      action.payload.username,
      action.payload.password,
    );
    console.log(action);
    if (response.status) {
      const payload = {
        username: response.data.username,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        display_name: response.data.display_name,
        image_url: response.data.image_url,
        default_avatar: response.data.default_avatar,
      };
      yield call(saveTokenToLocalStorage, payload.refresh_token);
      yield put(loginSuccess(payload));
    } else {
      const {errorMessage} = response;
      yield call(action.payload.callbacks.onFailed, errorMessage);
      yield loginFailed(errorMessage);
    }
  } catch (error) {
    yield call(action.payload.callbacks.onFailed, error);
    yield put(loginFailed(error));
  }
}

export function* signInUsernameWatcher() {
  yield takeLatest(LOGIN_USERNAME, signInUsernameWorker);
}

// Login Facebook
function* signInFacebookWorker(action: any) {
  try {
    const response = yield call(
      signinWithFacebook,
      action.payload.access_token,
    );

    console.log(action);
    if (response.status) {
      const payload = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };

      yield put(loginSuccess(payload));
    } else {
      const {errorMessage} = response;
      yield call(action.payload.callbacks.onFailed, errorMessage);
      yield loginFailed(errorMessage);
    }
  } catch (error) {
    yield call(action.payload.callbacks.onFailed, error);
    yield put(loginFailed(error));
  }
}

export function* signInFacebookWatcher() {
  yield takeLatest(LOGIN_FACEBOOK, signInFacebookWorker);
}

// Fetch user
function* fetchUserWorker(action: any) {
  try {
    const response = yield call(me, action.payload.refresh_token);
    if (response.status) {
      const payload = {
        display_name: response.data.display_name,
        image_url: response.data.image_url,
        default_avatar: response.data.default_avatar,
      };
      yield put(fetchUserSuccess(payload));
    } else {
      const {errorMessage} = response;
      //   yield call(action.payload.callbacks.onFailed, errorMessage);
      yield put(fetchUserFailed(errorMessage));
    }
  } catch (error) {
    // yield call(action.payload.callbacks.onFailed, error);
    yield put(fetchUserFailed(error));
  }
}

export function* fetchUserWatcher() {
  yield takeLatest(FETCH_CURRENT_USER, fetchUserWorker);
}

// Refresh token
function* refreshTokenWorker(action: any) {
  try {
    const response = yield call(token, action.payload.refresh_token);
    console.log(response);
    if (response.status) {
      const payload = {
        access_token: response.data.access_token,
      };
      yield put(refreshTokenSuccess(payload));
    } else {
      const {errorMessage} = response;
      yield put(fetchUserFailed(errorMessage));
    }
  } catch (error) {
    yield put(refreshTokenFailed(error));
  }
}

export function* refreshTokenWatcher() {
  yield takeLatest(REFRESH_TOKEN, refreshTokenWorker);
}
