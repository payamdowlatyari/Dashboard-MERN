import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;