import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import JoinUserModal from './modal/JoinUserModal';

import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUserTrue } = useSelector(state => state.userLogIn);

  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onscroll);
    return () => console.log('ddddddd');
  }, []);
  const goToHome = () => {
    navigation('/');
  };
  const goToMypage = () => {
    navigation('/mypage');
  };
  const goToLogIn = () => {
    navigation('/login');
  };

  const userLogOut = async e => {
    e.preventDefault();
    await signOut(auth);
    dispatch({ type: 'LOGOUT_USER' });
    navigation('/');
  };

  const bannerToBlack = keyframes`
    from {
      background-color: transparent;
    }to {
      background-color: #121212;
      color: white;
    }
    `;

  const buttonToWhite = keyframes`
    from {
      background-color: #121212;
      color: white;
    }to {
      background-color: white;
      color: #121212;
    }
    `;

  const NavContainer = styled.div`
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    color: ${location.pathname === '/login' ? 'white' : 'black'};
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${scrolled ? bannerToBlack : ''};
    animation-fill-mode: forwards;

    & > h2 {
      font-weight: 900;
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
    & > h2 {
      font-weight: 900;
      font-size: 20px;
      cursor: pointer;
    }
    & > span {
      display: flex;
      align-items: center;
      margin: 0 20px;
    }
    & > span > span {
      margin: 0 5px;
      cursor: pointer;
      font-family: sans-serif;
      font-size: 15px;
      margin: 0 20px;
    }
    & > span > span {
      margin: 0 5px;
      cursor: pointer;
      font-family: sans-serif;
      font-size: 15px;
    }
    & > span > img {
      width: 100px;
      margin-right: 40px;
      cursor: pointer;
    }
  `;

  const NavDiv = styled.div`
    position: absolute;
    right: 10px;

    & > button {
      padding: 8px 15px;
      margin: 5px;
      border-radius: 17px;
      border: none;
      background-color: #121212;
      color: white;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;

      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
      animation-name: ${scrolled ? buttonToWhite : ''};
      animation-fill-mode: forwards;
    }
  `;

  return (
    <NavContainer>
      <h2 onClick={goToHome}>Logo</h2>
      <span>
        <span onClick={goToHome}>Home</span>
        {isUserTrue && <span onClick={goToMypage}>Mypage</span>}
      </span>
      <NavDiv>
        {isUserTrue ? <button onClick={userLogOut}>Log out</button> : <button onClick={goToLogIn}>Log In</button>}
        <JoinUserModal>Sign Up</JoinUserModal>
      </NavDiv>
    </NavContainer>
  );
};

export default Navigation;
