import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem("token"),
  currentClient: null,
  loading: false,
  error: false,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentClient = action.payload.client;
      localStorage.setItem("token", action.payload.token);
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      localStorage.removeItem("token");
      state.loading = false;
      state.error = action.payload;
    },
    updateClientStart: (state) => {
      state.loading = true;
    },
    updateClientSuccess: (state, action) => {
      state.currentClient = action.payload.client;
      state.loading = false;
      state.error = false;
    },
    updateClientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signedOut: (state) => {
      localStorage.removeItem("token");
      state.currentClient = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateClientFailure,
  updateClientStart,
  updateClientSuccess,
  signedOut,
} = clientSlice.actions;

export default clientSlice.reducer;
