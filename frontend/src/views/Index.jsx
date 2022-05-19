import React from 'react';
import { Provider } from 'react-redux';
import Routes from '../Routes';
import store from '../app/store';

export default function Index() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Routes />
      </Provider>
    </React.StrictMode>
  );
}
