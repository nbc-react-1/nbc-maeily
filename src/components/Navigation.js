import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import JoinUserModal from './modal/JoinUserModal';

const Navigation = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigation('/');
  };
  const goToMypage = () => {
    navigation('/mypage');
  };
  const goToLogIn = () => {
    navigation('/login');
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
    color: ${location.pathname === '/login' ? 'white' : 'black'};
 
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

  return (
    <NavContainer>
      <h2 onClick={goToHome}>Logo</h2>
      <span>
        <span onClick={goToHome}>Home</span>
        <span onClick={goToMypage}>Mypage</span>
      </span>

      {/* 비로그인시 보여줄 버튼 */}
      <NavDiv>
        <button onClick={goToLogIn}>Log In</button>
        <JoinUserModal>Sign Up</JoinUserModal>

        {/* 로그인했을시 보여줄버튼 */}
        {/* <div>
          <button>글작성</button>
          <button>
            프로필
            <img src="" alt="profile-image" />
          </button>
        </div> */}
      </NavDiv>
    </NavContainer>
  );
};

const NavDiv = styled.div`
  position: absolute;
  right: 10px;

  & > button {
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
    border: none;
    background-color: black;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
`;

export default Navigation;
