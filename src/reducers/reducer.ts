import { combineReducers } from 'redux';
import { ShoppingData, DataItem } from '@interfaces/commonResponse';
import {UPDATE_INPUT_VALUES,REQUEST_CHART,API_SUCCESS,API_ERROR}from'@reducers/action'

export const initialState: ShoppingData = {
  startDate: '2020-11-03',
  endDate: '2021-01-23',
  timeUnit: '',
  category: '',
  keyword: '',
  device: '',
  gender: '',
  ages: [],
  trend: [] as DataItem[], // 'trend' 필드를 'DataItem' 배열로 초기화
};

export const inputValuesReducer = (
  state = initialState,
  action: {
    data: any;
    type: string;
    payload: ShoppingData;
  },
) => {
  switch (action.type) {
    case API_SUCCESS:
      return {
        ...state,
        trend: action.data.results[0].data,
      };

    case REQUEST_CHART:
      return {
        ...state,
        trend: [],
      };

    case API_ERROR:
      return state;

    case UPDATE_INPUT_VALUES:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  inputValues: inputValuesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
