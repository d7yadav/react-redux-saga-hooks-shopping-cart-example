import { takeEvery, call, put, all } from 'redux-saga/effects';
import { DATA_REQUESTED, dataLoaded, dataErrored } from './actions';
import ProductApi from "./service";

function* watcherSaga () {
    yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga () {
    try {
        const payload = yield call(ProductApi.getData);
        yield put(dataLoaded(payload));
    } catch (e) {
        yield put(dataErrored(e));
    }
}
//this is imported in root saga
export default function* rootSaga () {
    yield all([
        watcherSaga()
    ]);
}