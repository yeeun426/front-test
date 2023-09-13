import { combineReducers } from "redux";
// import storage from 'redux-persist/lib/storage';
import inputValuesReducer from "./counter"; 

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
const rootReducer = combineReducers({
    inputValues: inputValuesReducer,
});

export default rootReducer;


// 추후 컨테이너 컴포넌트를 만들게 될 때 스토어에서 관리하고 있는 상태를 조회하기 위해 useSelector를 사용할 때 필요로 함
export type RootReducerType = ReturnType<typeof rootReducer>;

