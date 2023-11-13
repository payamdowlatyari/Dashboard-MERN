import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectList: null,
    projectItem: null,
    loading: false,
    error: false,
  };


const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      getAllProjects: (state) => {
        state.loading = true;
      },
      getAllProjectsSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.projectList = action.payload;
      },
      getAllProjectsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      getProject: (state) => {
        state.loading = true;
      },
      getProjectSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.projectItem = action.payload;
      },
      getProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure,
    getProject,
    getProjectSuccess,
    getProjectFailure
} = projectSlice.actions;

export default projectSlice.reducer;