/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios';

export const exampleSlice = createSlice({
  name: 'loggedStatus',
  initialState: {
    value: localStorage.getItem('AccessToken') != null
      ? localStorage.getItem('AccessToken')
      : 'Unauthorized',
  },
  reducers: {
    login(state, { payload }) {
      const localStorageNotNull = localStorage.getItem('AccessToken');
      if (localStorageNotNull == null) {
        localStorage.setItem('AccessTokenObj', JSON.stringify(payload.accessToken));
        localStorage.setItem('AccessToken', JSON.stringify(payload.accessToken));
        axios.defaults.headers['access-token'] = JSON.stringify(payload.accessToken);
        axios.defaults.headers.client = JSON.stringify(payload.accessToken);
        axios.defaults.headers.uid = JSON.stringify(payload.accessToken);
        state.value = payload.accessToken;
      }
    },
    logout(state) {
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('AccessTokenObj');

      state.value = 'Unauthorized';
    },
  },
});

export const { logout, login } = exampleSlice.actions;

export default exampleSlice.reducer;
