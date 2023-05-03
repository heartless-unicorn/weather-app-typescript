import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  actions: String[];
}
const initialState: initialState = {
  actions: [],
};

const ActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<String>) {
      state.actions.push(action.payload);
    },
    removeCity(state, action: PayloadAction<String>) {
      const index: number = state.actions.indexOf(action.payload);
      state.actions.splice(index, 1);
    },
  },
});
export const { addCity, removeCity } = ActionSlice.actions;
export const selectActions = (state: any) => state.actions;
export default ActionSlice.reducer;
