import { createSlice } from "@reduxjs/toolkit";
import { settingsInitialState } from "../../api/mockdata";

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState: settingsInitialState,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
