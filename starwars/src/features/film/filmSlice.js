import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { fetchFilms } from './counterAPI';

const initialState = {
  value: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadFilmsAsync = createAsyncThunk(
  'film/fetch',
  async (amount) => {
    const response = await fetch('https://swapi.dev/api/films/', {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      //body: JSON.stringify(data)
    });
    return await response.json();

    //return response.data;
  }
);

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loadFilmsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadFilmsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { film } = filmSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const loadFilm = (state) => state.film.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.



export default filmSlice.reducer;
