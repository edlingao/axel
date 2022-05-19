import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Blogs from './Blogs';
import MainContainer from '../components/MainContainer';

export default function Home() {
  const authToken = useSelector((state) => state.loggedStatus.value);
  return (
    <MainContainer>
      {
        authToken === 'Unauthorized'
          ? <Login />
          : <Blogs />
      }
    </MainContainer>
  );
}

// Home.propTypes = {
//   user: PropTypes.string.isRequired,
//   handleLogin: PropTypes.func.isRequired,
// };
