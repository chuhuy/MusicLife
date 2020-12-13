import { call, put, takeLatest } from "redux-saga/effects";
import { postSongCounter } from "../../../api/explore";
import { COUNTER, skipMusic } from "./actions";

// Login email
function* counterWorker(action: any) {
    try {
        const response = yield call(postSongCounter, action.payload);
        console.log('post counter')
        yield put(skipMusic(true, false));
        if (response.code){
            console.log('counter succeed');
        } else {
            console.log('counter failed')
        }
    }
    catch (error) {
        console.log('counter can"t call');
    }
}

export function* counterWatcher() {
    yield takeLatest(COUNTER, counterWorker);
}
