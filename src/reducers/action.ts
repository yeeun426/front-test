/* eslint-disable default-param-last */
import { ShoppingData } from '@interfaces/commonResponse';

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