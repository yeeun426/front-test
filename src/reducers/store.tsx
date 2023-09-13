import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './index';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root", 
    storage, // localStorage에 저장
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [],
});

export const persistor = persistStore(store); // persist store 내보내기

