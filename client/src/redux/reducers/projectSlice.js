import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectList: null,
    projectItem: null,
    projectOwner: null,
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
      getProjectStart: (state) => {
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
      },
      getProjectOwnerStart: (state) => {
        state.loading = true;
      },
      getProjectOwnerSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.projectOwner = action.payload;
      },
      getProjectOwnerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      createProjectStart: (state) => {
        state.loading = true;
      },
      createProjectSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.projectItem = action.payload;
      },
      createProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateProjectStart: (state) => {
        state.loading = true;
      },
      updateProjectSuccess: (state) => {
        state.loading = false;
        state.error = false;
      },
      updateProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      addCommentStart: (state) => {
        state.loading = true;
      },
      addCommentSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.projectItem = action.payload;
      },
      addCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure,
    getProjectStart,
    getProjectSuccess,
    getProjectFailure,
    getProjectOwnerStart,
    getProjectOwnerSuccess,
    getProjectOwnerFailure,
    createProjectStart,
    createProjectSuccess,
    createProjectFailure,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectFailure,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure
} = projectSlice.actions;

export default projectSlice.reducer;