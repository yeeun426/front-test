/* eslint-disable default-param-last */
import { ShoppingData, DataItem } from '@interfaces/commonResponse';

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

// 액션 유형
export const UPDATE_INPUT_VALUES = 'UPDATE_INPUT_VALUES';

export const REQUEST_CHART = 'REQUEST_CHART';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

// 액션 생성자 함수
export const updateInputValues = (inputValues: ShoppingData) => ({
  type: UPDATE_INPUT_VALUES,
  payload: inputValues,
});

export const requestChart = (data: ShoppingData) => ({
  type: REQUEST_CHART,
  payload: data,
});

// 리듀서
const inputValuesReducer = (
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

export default inputValuesReducer;
