import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { showFinishTimeComponent: false },
  reducers: {
    toggle(state) {
      state.showFinishTimeComponent = !state.showFinishTimeComponent;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
