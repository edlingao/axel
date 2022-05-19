/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = exampleSlice.actions;

export default exampleSlice.reducer;
