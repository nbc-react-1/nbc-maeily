import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid gray;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  & > span {
    display: flex;
    align-items: center;
  }
  & > span > img {
    width: 100px;
    margin-right: 40px;
    cursor: pointer;
  }
`;

const NavSpan = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Navigation = () => {
  const navigation = useNavigate();

  const goToHome = () => {
    navigation('/');
  };
  return (
    <NavContainer>
      <span>
        {/* <Link to="/"> */}
        <img onClick={goToHome} src="../img/img.jpeg" alt="logo" />
        {/* </Link> */}
        <NavSpan>
          <span>Home</span>
          <span>Mypage</span>
          {/* 비로그인시 보여줄 버튼 */}
          <div>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
          {/* 로그인했을시 보여줄버튼 */}
          <div>
            <button>글작성</button>
            <button>
              프로필
              <img src="" alt="profile-image" />
            </button>
          </div>
        </NavSpan>
      </span>
    </NavContainer>
  );
};

export default Navigation;
