import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // currentUser: null,
    loading: false,
    error: false,
  };


const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      getAllProjects: (state) => {
        state.loading = true;
      },
      getAllProjectsSuccess: (state) => {
        state.loading = false;
        state.error = false;
      },
      getAllProjectsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure
} = projectSlice.actions;

export default projectSlice.reducer;