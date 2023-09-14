import {ShoppingData} from "../interfaces/commonResponse"
// as const : type의 typescript 타입이 string이 아닌 실제값을 가리킴
// 액션 유형
export const UPDATE_INPUT_VALUES = 'UPDATE_INPUT_VALUES' as const;

// 왠만하면 액션의 파라미터는 payload로 씀
// 액션 생성자 함수 작성
export interface UpdateInputValuesAction {
    type: typeof UPDATE_INPUT_VALUES;
    payload: ShoppingData;
}

// 액션 생성자 함수 작성
export const updateInputValues = (inputValues: ShoppingData) => ({
    type: UPDATE_INPUT_VALUES,
    payload: inputValues,
});

// 상태 초기값 선언
const initialState: ShoppingData = {
    startDate: "",
    endDate: "",
    timeUnit: "",
    category: "",
    keyword: "",
    device: "",
    gender: "",
    ages: [],
    // startDate: "2020-11-03",
    // endDate: "2021-01-23",
    // timeUnit: "month",
    // category: "50000000",
    // keyword: "",
    // device: "",
    // gender: "",
    // ages: [],
};
  
// 리듀서
const inputValuesReducer = (state = initialState, action: UpdateInputValuesAction): ShoppingData => {
    switch (action.type) {
      case UPDATE_INPUT_VALUES:
        return {
          ...state,
          ...action.payload,
        };
        // default를 안쓰면 undefined가 나오므로 꼭 default문 넣기.
        default:
            return state;
    }
};

export default inputValuesReducer;
