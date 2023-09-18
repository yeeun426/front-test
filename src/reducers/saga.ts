import { put, takeLatest, all, call } from 'redux-saga/effects';
import { REQUEST_CHART, API_SUCCESS, API_ERROR } from './action'; // 액션 및 액션 타입 import
import { postChart } from '../api/index'; // API 호출 함수 import
import { ShoppingData, APIResponse } from '../interfaces/commonResponse';

function* fetchChartData(action: any) {
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

function* watchFetchChartData() {
  yield takeLatest(REQUEST_CHART, fetchChartData);
}

export default function* rootSaga() {
  yield all([
    watchFetchChartData(),
  ]);
}
