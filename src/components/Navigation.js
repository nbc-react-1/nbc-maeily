import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100vw;
  height: 60px;
  /* border-bottom: 1px solid gray; */
  display: flex;
  align-items: center;
  padding: 0 10px;

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
  }
  & > span > img {
    width: 100px;
    margin-right: 40px;
    cursor: pointer;
  }
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
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

const Navigation = () => {
  const navigation = useNavigate();

  const goToHome = () => {
    navigation('/');
  };
  const goToMypage = () => {
    navigation('/mypage');
  };
  const goToLogIn = () => {
    navigation('/login');
  };
  const goToSignIn = () => {
    navigation('/signin');
  };
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
        <button onClick={goToSignIn}>Sign In</button>

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

export default Navigation;
