import {getData, getTableSources, getTableSourcesColumns} from "../apis/main";
import {takeEvery, put, call, all} from 'redux-saga/effects';
import {GET_INITIAL_DATA, GET_LOADING, GET_ERROR, SEND_QUERY} from "../types";
import {putTableSources, putTableSourcesColumns, putLoading, putError, putData} from "../slices/mainSlice";

export function* sendQuerySaga({initialDataOfTableSources, initialDataOfTableSourcesColumns}: any): any {
    try {
        yield put(putLoading(true));
        const [tableSources, tableSourcesColumns]: Array<any> = yield all([
            call(getTableSources, initialDataOfTableSources),
            call(getTableSourcesColumns, initialDataOfTableSourcesColumns)
        ]);
        yield put(putTableSources(tableSources));
        yield put(putTableSourcesColumns(tableSourcesColumns));
        yield put(putLoading(false));
    } catch (e: any) {
        yield put(putLoading(false));
        yield put(putLoading(e));
    }
}
export function* sendNewQuerySaga({data}: any): any {
    try {
        yield put(putLoading(true));
        const res: Array<any> = yield call(getData, data);
        yield put(putData(res));
        yield put(putLoading(false));
    } catch (e: any) {
        yield put(putLoading(false));
        yield put(putLoading(e));
    }
}

export function* watchQuery() {
    yield takeEvery<any>(GET_INITIAL_DATA, sendQuerySaga);
    yield takeEvery<any>(SEND_QUERY, sendNewQuerySaga);
}