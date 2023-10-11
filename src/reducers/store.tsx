import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root", // 어느 지점에서부터 데이터를 저장할 것인지
  storage: storage, // 웹의 storage
  whitelist: ["inputValues"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // persistConfig가 추가된 reducer반환

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    sagaMiddleware,
  ],
});
// persistConfig가 추가된 rootReducer로 store 생성

export const persistor = persistStore(store); // 새로고침, 종료해도 지속될 store 생성

sagaMiddleware.run(rootSaga);
