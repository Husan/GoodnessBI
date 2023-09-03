import {all} from 'redux-saga/effects';
import {watchQuery} from "./main";

export function* rootSaga() {
    yield all([
        watchQuery()
    ])
}