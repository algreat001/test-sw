import { configureStore } from '@reduxjs/toolkit';
import filmListReducer from '../features/film/slices/filmListSlice';
import filmInfoReducer from '../features/film/slices/filmInfoSlice';
import reviewReducer from '../features/film/slices/reviewSlice';

export const store = configureStore({
  reducer: {
    filmList: filmListReducer,
    filmInfo: filmInfoReducer,
    review: reviewReducer,
  },
});
