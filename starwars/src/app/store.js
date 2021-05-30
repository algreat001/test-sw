import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filmListReducer from '../features/film/slices/filmListSlice';
import filmInfoReducer from '../features/film/slices/filmInfoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filmList: filmListReducer,
    filmInfo: filmInfoReducer
  },
});
