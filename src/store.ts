import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import actionSlice from "./components/action-slice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, actionSlice);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
