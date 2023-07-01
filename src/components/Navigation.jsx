import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import JoinUserModal from './modal/JoinUserModal';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navigation = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUserTrue, storeInfo } = useSelector(state => state.userLogIn);

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
    <NavContainer location={location.pathname}>
      <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/133937368/250246793-23f60fee-7a0f-47bd-a4ed-12b27aac0a7b.svg" alt="로고 이미지" onClick={goToHome} />
      <NextLogo>
        <span onClick={goToHome}>Home</span>
      </NextLogo>
      <NavDiv>
        {isUserTrue ? (
          <>
            {' '}
            <NavMypageImg onClick={goToMypage} url={storeInfo.profileImg}></NavMypageImg>
            <button onClick={userLogOut}>Log out</button>
          </>
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
  background-color: ${props => (props.location === '/login' ? 'transparent' : 'white')};
  position: fixed;
  top: 0;
  color: ${props => (props.location === '/login' ? 'white' : 'black')};
  color: black;
  left: 0;
  right: 0;
  z-index: 20;
  & > img {
    width: 8em;
    margin-left: 1em;
    cursor: pointer;
  }
`;

const NextLogo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  position: relative;

  span::after {
    content: '';
    position: absolute;
    width: 45px;
    height: 2px;
    left: 0;
    bottom: -3px;
    background-color: black;
    transform: scaleX(0);
    transition: all ease-in-out 0.3s;
  }

  span:hover::after {
    transform: scaleX(1);
  }

  span {
    margin: 0 5px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 15px;
  }
  img {
    width: 100px;
    margin-right: 40px;
    cursor: pointer;
  }
`;

const NavDiv = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  & > button {
    padding: 10px 17px;
    margin: 5px 10px;
    border-radius: 5px;
    border: none;
    border: 1px solid black;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    color: black;
    background-color: transparent;
    position: relative;
  }

  & > button::before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    z-index: -1;
    background-color: black;
    left: 0;
    top: 0;
    transition: 0.3s ease-in-out;
  }

  & > button:hover {
    color: #fff;
  }

  & > button:hover::before {
    content: '';
    width: 100%;
    height: 100%;
    color: white;
    position: absolute;
  }
`;

const NavMypageImg = styled.span`
  width: 35px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 50%;
  margin-right: 10px;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export default Navigation;
