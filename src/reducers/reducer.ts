import { combineReducers } from 'redux';
import inputValuesReducer from '@reducers/action';

const rootReducer = combineReducers({
  inputValues: inputValuesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
