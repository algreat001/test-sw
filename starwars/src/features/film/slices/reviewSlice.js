import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  status: 'init_wait',
};

export const saveReviewAsync = createAsyncThunk(
  'review/saveReview',
  async (text, { rejectWithValue }) => {
    try {
      // заглушка на запись обзора - задержка 1 секунда
      let response =  await new Promise((resolve) => setTimeout(() => resolve(text), 1000));
      return response;
    }
    catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(saveReviewAsync.pending, (state) => {
        state.status = 'saving';
      })
      .addCase(saveReviewAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'idle';
      });
  },
});


export const selectReview = (state) => state.review.value;
export const selectReviewStatus = (state) => state.review.status;

export default reviewSlice.reducer;
