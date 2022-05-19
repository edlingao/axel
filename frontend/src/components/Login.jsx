/* eslint-disable no-throw-literal */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

import logo from '../svg/logo.svg';
import axios from '../axios/axios';
import routes from '../axios/routes';
import toastr from '../toastr/toastr';

const LoginForm = styled.form`
    width: 31.25rem;
    height: 30.875rem;
    margin: auto auto;
  
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    padding: 1rem;
    border-radius: 1rem;
    
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
    box-shadow: inset 0px 0px 20px 5px rgba(255, 255, 255, 0.25);

    @media screen and (max-width: 600px) {
      width: 100%;
      margin: 0;
    }
`;
const LoginHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .logo {
    width: 9.375rem;
    height: 7.563rem;
  }
  .word-title {
    h1{
      font-weight: 100;
      font-size: 3.3rem;
    }
  }

  .floating-text {
    position: absolute;
    bottom: 0;
    left: 3rem;
    font-size: .7rem;
    a {
      color: #6C4C94;
      text-decoration: none;
      margin-left: .5rem;
    }
  }

  @media screen and (max-width: 400px) {
    .word-title {
      h1{
        font-weight: 100;
        font-size: 2.3rem;
      }
    }
    .logo {
      width: 50%;
      height: 50%;
    }
    .floating-text {
      left: 0.5rem;
    }
  }
`;
const Main = styled.main`
  width: 100%;
  height: 40%;
  margin: auto 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  input,
  label {
    outline: none;
  }
  label {
    width: 80%;
  }
  input {
    border: 0;
    width: 100%;
    height: 100%;
    padding: .5rem 1rem;
    font-size: 1.5rem;

    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    &:placeholder {
      color: #ABABAB;
    }
  }
`;
const StyledLink = styled(Link)`
  color: #6C4C94;
  text-decoration: none;
  margin-left: .5rem;
`;
const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 80%;
  .register-link {
    font-weight: bold;
  }
  input {
    background: black;
    border: 0;
    width: 100%;
    padding: 0.313rem;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    outline: none;
    margin-bottom: .5rem;
  }
`;

export default function Form({ register = 'false' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPsw, setConfirmedPsw] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const loginEvent = (e) => {
    if (email === '' || password === '') return;
    e.preventDefault();
    axios.post(routes.signIn, {
      email,
      password,
    }).then(({ headers, data }) => {
      if (data.length === 0) {
        throw 'Invalid email or password';
      }
      if (data.success === false) {
        data.errors.forEach((err) => toastr.error(err));
      } else {
        dispatch(login({
          accessToken: data[0],
          client: headers.client,
          uid: headers.uid,
        }));
      }
    }).catch((errors) => {
      console.error(errors);
      toastr.error(errors);
    });
  };

  const registerEvent = (e) => {
    if (email === '' || password === '') return;
    e.preventDefault();
    axios.post(routes.register, {
      email,
      password,
      password_confirmation: confirmedPsw,
    }).then(({ data }) => {
      if (data.status === 'error') {
        data.errors.full_messages.forEach((message) => toastr.error(message));
      }
      if (data.status === 'success') {
        toastr.success('Succesfully registered!');
        history.push('/');
      }
    }).catch((error) => {
      toastr.error(error.message);
    });
  };

  return (
    <LoginForm>
      <LoginHeader className="header">
        <div className="word-title">
          <h1>Code</h1>
        </div>
        <img alt="Code Blog" title="Code Blog" src={logo} className="logo" />
        <div className="word-title">
          <h1>Blog</h1>
        </div>
      </LoginHeader>
      <Main className="main">
        <label htmlFor="email">
          <input type="email" placeholder="Email..." required onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <input type="password" placeholder="Password..." required onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="password-confirmation" className={`${register === 'true' ? '' : 'hide-item'}`}>
          <input type="password" placeholder="Confirm password..." required onChange={(e) => setConfirmedPsw(e.target.value)} />
        </label>
      </Main>
      <Footer className="footer">
        <input
          type="submit"
          value={
            register === 'true'
              ? 'Register'
              : 'Login'
          }
          onClick={
            register === 'true'
              ? (event) => registerEvent(event)
              : (event) => loginEvent(event)
          }
        />
        { register === 'true'
          ? (
            <span className="register-link">
              Already have an account?
              <StyledLink to="/">Login</StyledLink>
            </span>
          )
          : (
            <span className="register-link">
              Not registered?
              <StyledLink to="/register">Register</StyledLink>
            </span>
          )}
      </Footer>
    </LoginForm>
  );
}

Form.defaultProps = {
  register: 'false',
};
Form.propTypes = {
  register: PropTypes.string,
};
