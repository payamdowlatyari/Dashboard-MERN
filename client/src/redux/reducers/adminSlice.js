import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientList: null,
  clientItem: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
      getAllClients: (state) => {
        state.loading = true;
      },
      getAllClientsSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.clientList = action.payload;
      },
      getAllClientsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      getClientStart: (state) => {
        state.loading = true;
      },
      getClientSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.clientItem = action.payload;
      },
      getClientFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      editClientStart: (state) => {
        state.loading = true;
      },
      editClientSuccess: (state, action) => {
        state.clientItem = action.payload;
        state.loading = false;
        state.error = false;
      },
      editClientFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteClientStart: (state) => {
        state.loading = true;
      },
      deleteClientSuccess: (state) => {
        state.loading = false;
        state.error = false;
      },
      deleteClientFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
  },
});

export const {
getClientStart,
getClientSuccess,
getClientFailure,
getAllClients,
getAllClientsSuccess,
getAllClientsFailure,
editClientStart,
editClientSuccess,
editClientFailure,
deleteClientStart,
deleteClientSuccess,
deleteClientFailure,
} = adminSlice.actions;

export default adminSlice.reducer;
