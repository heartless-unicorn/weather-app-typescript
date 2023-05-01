import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./components/action-slice";

export const store = configureStore({
  reducer: {
    actions: actionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
