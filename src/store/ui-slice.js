import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showFinishTimeComponent: true,
    showAddRacerComponent: false,
  },
  reducers: {
    showFinish(state) {
      state.showFinishTimeComponent = true;
      state.showAddRacerComponent = false;
    },
    showAddRacer(state) {
      state.showAddRacerComponent = true;
      state.showFinishTimeComponent = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
