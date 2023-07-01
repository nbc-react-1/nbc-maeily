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
    console.log('goToHome');
    navigation('/');
  };
  const goToMypage = () => {
    console.log('goToMypage');
    navigation('/mypage');
  };
  const goToLogIn = () => {
    console.log('goToLogIn');
    navigation('/login');
  };
  const userLogOut = async e => {
    e.preventDefault();
    console.log('userLogOut');
    await signOut(auth);
    dispatch({ type: 'LOGOUT_USER' });
    navigation('/');
  };
  return (
    <NavContainer>
      <h2 onClick={goToHome}>
        <svg xmlns="http://www.w3.org/1999/xlink" height="3em" viewBox="0 0 1366 768">
          <g>
            <path
              d="M412,238.3v11.8c0,2.2,0.8,4.6,0.9,4.8v0.1h-7v-0.1c0-0.2,0.8-2.6,0.8-4.8v-12.5l-6.4,17.4h-1.6l-6.9-17.3
		c0,0.2,0,0.5,0,0.7v9.4c0,3.2,1.6,6.7,1.7,7.1v0.2h-4.8v-0.2c0.1-0.4,1.7-3.9,1.7-7.1v-9.4c0-2.2-1.2-4.6-1.3-4.8v-0.1h6.5
		l5.9,14.5l5.3-14.5h6.2v0.1C412.9,233.8,412,236.2,412,238.3z"
            />
            <path
              d="M430.7,252.5c-0.2,1.6-1.4,2.8-3.4,2.8c-1.7,0-2.9-0.9-3.4-2.5c-0.7,1.2-2.2,2.5-4.6,2.5c-3.2,0-4.9-2.5-4.9-4.8
		c0-3.1,2.9-5.1,6.2-4.9c0.8,0,2,0.2,3,0.6v-1.7c0-2.1-0.3-3.4-1.1-3.4c-1.7,0-6.5,3.8-6.7,4.1h-0.1v-4.4c2.8-0.7,5.5-1,7.2-1
		c4.2,0,5.8,2.2,5.8,5.2v5.7C428.8,252.3,429.2,253.1,430.7,252.5L430.7,252.5z M423.8,251.9c0-0.2,0-0.5,0-0.8v-4.1
		c-0.2,0-0.5,0-0.8-0.1c-2.2-0.1-3.2,1.1-3.2,2.7c0,1.6,0.9,2.9,2.5,2.9C422.9,252.6,423.4,252.4,423.8,251.9z"
            />
            <path
              d="M446,250.5l0.1,0.1c-0.7,2-3,4.7-6.9,4.7c-3.7,0-7.8-2.5-7.8-7.9c0-4.9,3.3-7.8,7.9-7.8c5.3,0,7.1,3.9,7.1,7.5h-9.5
		c0.3,2.9,1.6,5,4.5,5C443,252.1,444.3,251.6,446,250.5z M436.8,245.6c0,0.3,0,0.6,0,0.8l4.6-1.1c0-2-0.4-4.4-2.2-4.4
		C437.3,240.9,436.8,243.4,436.8,245.6z"
            />
            <path d="M448.1,254.9c0-0.2,0.9-2.6,0.9-4.8v-5.4c0-2.2-0.8-4.6-0.9-4.8v-0.1h5.9v10.3c0,2.2,0.8,4.6,0.9,4.8v0.1h-6.7V254.9z" />
            <path d="M456.3,254.9c0.1-0.2,0.9-2.6,0.9-4.8v-12c0-2.2-0.9-4.5-0.9-4.7l0-0.1l6-0.7v17.5c0,2.2,0.8,4.6,0.9,4.8v0.1h-6.7V254.9z" />
            <path
              d="M480,239.9c-0.1,0.2-1.5,2.4-2.3,4.3l-5.5,13.1c-1.5,3.8-3.9,4.5-7.9,3.1l1-4.6l0.1,0c2.2,2.3,4.6,3.4,5.8,0.6l0.3-0.7
		l-5.3-11.4c-0.9-2-2.4-4.1-2.6-4.3v-0.1h8v0.1c-0.1,0.2-0.9,2.2-0.1,4l2.6,5.6l2.3-5.5c0.8-1.8-0.2-3.9-0.3-4.1v-0.1h4V239.9z"
            />
            <path
              d="M496.6,248.6v6.4h-15.4v-0.1c0-0.2,0.9-2.6,0.9-4.8v-11.8c0-2.2-0.8-4.6-0.9-4.8v-0.1h7v0.1c0,0.2-0.9,2.6-0.9,4.8v15.4
		h2.8c2.8,0,5.9-4.9,6.2-5H496.6z"
            />
            <path
              d="M497.9,247.4c0-5.3,3.8-7.7,8.1-7.7c4.3,0,8.1,2.4,8.1,7.7c0,5.4-3.8,8-8.1,8C501.7,255.3,497.9,252.7,497.9,247.4z
		 M508.6,247.4c0-3.1-0.6-6.5-2.5-6.5c-2,0-2.5,3.4-2.5,6.5c0,3.1,0.5,6.7,2.5,6.7C508,254,508.6,250.5,508.6,247.4z"
            />
            <path
              d="M515.8,247.4c0-5.3,3.8-7.7,8.1-7.7c4.3,0,8.1,2.4,8.1,7.7c0,5.4-3.8,8-8.1,8C519.5,255.3,515.8,252.7,515.8,247.4z
		 M526.4,247.4c0-3.1-0.6-6.5-2.5-6.5c-2,0-2.5,3.4-2.5,6.5c0,3.1,0.5,6.7,2.5,6.7C525.8,254,526.4,250.5,526.4,247.4z"
            />
            <path
              d="M539.1,250.1c0,2.2,0.8,4.6,0.8,4.8v0.1h-6.7v-0.1c0-0.2,0.9-2.6,0.9-4.8v-12c0-2.2-0.9-4.5-0.9-4.7l0-0.1l6-0.7V250.1z
		 M549.7,254.9v0.1h-5.8l-4.4-7.9l0-0.1l3.3-2.9c2-1.8,1-3.9,0.8-4.2v-0.1h6v0.1l-5.8,5.1L549.7,254.9z"
            />
          </g>
          <circle cx="451" cy="235.7" r="3" />
        </svg>
      </h2>
      <span>
        <span onClick={goToHome}>Home</span>
        {isUserTrue && <span onClick={goToMypage}>Mypage</span>}
      </span>
      <NavDiv>
        {isUserTrue ? (
          <button onClick={userLogOut}>Log out</button>
        ) : (
          <>
            <button onClick={goToLogIn}>Log In</button> <JoinUserModal>Sign Up</JoinUserModal>
          </>
        )}
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
