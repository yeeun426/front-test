import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from './reducer';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

// Redux-persist 설정
const persistConfig = {
    key: "root", // 저장소의 키 이름
    storage, // localStorage에 저장
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});

export const persistor = persistStore(store); 

sagaMiddleware.run(rootSaga); // 루트 사가 실행