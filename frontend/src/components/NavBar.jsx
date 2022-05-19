import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../store/userSlice';
import logo from '../svg/logo.svg';
import Button from './Button';

export default function NavBar() {
  const Nav = styled.nav`
    width: 100%;
    height: 3.125rem;
    background: black;
    
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: relative;
    padding: 0.625rem 0.875rem;
    img {
      width: 3.125rem;
      height: 3.125rem;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(50px);
      border-radius: 3px;

      position: absolute;
      top: 0.625rem;
      left: 1.25rem;
    }
    .options {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      width: 10%;
    }
  `;
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <img alt="A beautiful logo" className="logo" src={logo} />
      </Link>
      <div className="options">
        <Button circle onClick={logOut}>
          <i className="icon">
            <i className="material-icons">exit_to_app</i>
          </i>
        </Button>

      </div>
    </Nav>
  );
}
