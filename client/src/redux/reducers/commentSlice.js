import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
  };

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      getAllcomments: (state) => {
        state.loading = true;
      },
      getAllcommentsSuccess: (state) => {
        state.loading = false;
        state.error = false;
      },
      getAllcommentsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      getcomment: (state) => {
        state.loading = true;
      },
      getcommentSuccess: (state) => {
        state.loading = false;
        state.error = false;
      },
      getcommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const {
    getAllcomments,
    getAllcommentsSuccess,
    getAllcommentsFailure,
    getcomment,
    getcommentSuccess,
    getcommentFailure
} = commentSlice.actions;

export default commentSlice.reducer;