/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

export const exampleSlice = createSlice({
  name: 'blogs',
  initialState: {
    value: [],
  },
  reducers: {
    setAllBlogs(state, { payload }) {
      state.value = payload.reverse();
    },
    addBlog(state, { payload }) {
      const newBlog = {
        ...payload,
        id: state.value.length + 1,
        created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
        updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      };
      state.value = [...state.value, newBlog];
    },
  },
});

export const { setAllBlogs, addBlog } = exampleSlice.actions;

export default exampleSlice.reducer;
