import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import MyPosts from './MyPosts';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState('info'); // 'info' 또는 'posts'로 초기화

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <MypageContainer>
      <UserImage src="https://avatars.githubusercontent.com/u/133937368?v=4" alt="User Image" />
      <UserName>suzzjeon</UserName>
      <NavigationText>
        <span onClick={() => handleTabChange('info')}>회원정보 보기</span> | <span onClick={() => handleTabChange('posts')}>내가 쓴 게시글</span>
      </NavigationText>
      {/* 내용에 따라 조건부로 컴포넌트를 렌더링 */}
      {activeTab === 'info' && (
        <div>
          {<UserInfo />}
          {/* 회원정보 표시 */}
        </div>
      )}
      {activeTab === 'posts' && (
        <div>
          {<MyPosts />}
          {/* 내가 쓴 게시글 표시 */}
        </div>
      )}
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const UserName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const NavigationText = styled.p`
  /* 내비게이션 안내 텍스트 */
  font-size: 15px;
  margin-bottom: 2rem;
  cursor: pointer;
`;
