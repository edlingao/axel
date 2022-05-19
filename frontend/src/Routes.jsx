import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SingleBlog from './views/IndividualBlog';
import Home from './views/Home';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import './scss/main.scss';
import { logout } from './store/userSlice';
import axios from './axios/axios';
import toastr from './toastr/toastr';

export default function Routes() {
  const dispatch = useDispatch();
  axios.interceptors.response.use(
    (response) => {
      const { headers } = response;

      switch (response.status) {
        case 401:
          toastr.error('Session expired');
          dispatch(logout());
          window.location = '/';
          break;
        case 200:
          if (headers['access-token'] !== '') {
            // dispatch(login({
            //   accessToken: headers['access-token'],
            //   client: headers.client,
            //   uid: headers.uid,
            // }));
          }
          break;
        default:
          break;
      }

      return response;
    },
  );
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
        >
          <Home />
        </Route>
        <Route path="/register">
          <MainContainer>
            <Login register="true" />
          </MainContainer>
        </Route>
        <Route
          path="/blog/:id"
          component={SingleBlog}
        />
      </Switch>
    </Router>
  );
}
