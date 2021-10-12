import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  status: 'init_wait',
};

export const loafFilmInfoAsync = createAsyncThunk(
  'filmInfo/fetchFilmInfo',
  async (url, { rejectWithValue }) => {
    try {
      let response = await fetch(url);
      let jResponse = await response.json();

      return {
        info: jResponse.opening_crawl, 
        //в аpi нет лого и вообще ссылок на картинки
        logo: 'https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo.svg',
        title: jResponse.title
      }
    }
    catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const filmInfoSlice = createSlice({
  name: 'filmInfo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loafFilmInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loafFilmInfoAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'idle';
      });
  },
});

export const selectFilmInfo = (state) => state.filmInfo.value;
export const selectFilmInfoStatus = (state) => state.filmInfo.status;

export default filmInfoSlice.reducer;
