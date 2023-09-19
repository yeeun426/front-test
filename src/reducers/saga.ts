import { put, takeLatest, all, call } from 'redux-saga/effects';
import { REQUEST_CHART, API_SUCCESS, API_ERROR } from './action';
import { postChart } from '../api/index';
import { ShoppingData, APIResponse } from '../interfaces/commonResponse';

function* sagaChartData(action: any) {
  try {
    const params: ShoppingData = action.payload;
    const data: APIResponse = yield call(postChart, params);

    if (data) {
      yield put({ type: API_SUCCESS, data });
    }

  } catch (error) {
    yield put({ type: API_ERROR, error });
  }
}

function* watchSagaChartData() {
  yield takeLatest(REQUEST_CHART, sagaChartData);
}

export default function* rootSaga() {
  yield all([
    watchSagaChartData(),
  ]);
}
