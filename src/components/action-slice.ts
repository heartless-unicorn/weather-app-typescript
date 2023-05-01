import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<String> = [];

const ActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<String>) {
      return [...state, action.payload];
    },
    removeCity(state, action: PayloadAction<String>) {
      const index: number = state.indexOf(action.payload);
      return state.splice(index, 1);
    },
  },
});
export const { addCity, removeCity } = ActionSlice.actions;
export default ActionSlice.reducer;
