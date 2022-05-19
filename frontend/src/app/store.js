import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../store/exampleSlice';
import loggedReducer from '../store/userSlice';
import blogs from '../store/blogsSlice';

export default configureStore({
  reducer: {
    example: exampleReducer,
    loggedStatus: loggedReducer,
    blogs,
  },
});
