import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import JoinUserModal from './modal/JoinUserModal';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navigation = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { isUserTrue, sucessUserInfo, storeInfo } = useSelector(state => state.userLogIn);

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
  right: 30px;
  display: flex;
  & > button {
    padding: 10px 17px;
    margin: 5px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    color: #f4f5f9;
    background-color: #121212;
  }
`;
export default Navigation;
