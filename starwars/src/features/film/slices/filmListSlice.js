import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { fetchCount } from './counterAPI';

const initialState = {
  value: [],
  status: 'init_wait',
};

export const loafFilmListAsync = createAsyncThunk(
  'filmList/fetchFilmList',
  async (value, { rejectWithValue }) => {
    try {
      let response = await fetch('https://swapi.dev/api/films/');
      let jResponse = await response.json();
      return jResponse.results;
    }
    catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const filmListSlice = createSlice({
  name: 'filmList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loafFilmListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loafFilmListAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'idle';
      });
  },
});


export const selectFilmList = (state) => state.filmList.value;
export const selectFilmListStatus = (state) => state.filmList.status;

export default filmListSlice.reducer;
