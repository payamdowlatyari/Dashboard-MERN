import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      state.currentClient = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateClientStart: (state) => {
      state.loading = true;
    },
    updateClientSuccess: (state, action) => {
      state.currentClient = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateClientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClientStart: (state) => {
      state.loading = true;
    },
    deleteClientSuccess: (state) => {
      state.currentClient = null;
      state.loading = false;
      state.error = false;
    },
    deleteClientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
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
  deleteClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  signOut,
} = clientSlice.actions;

export default clientSlice.reducer;
