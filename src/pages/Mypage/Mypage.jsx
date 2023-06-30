import React, { useState } from 'react';
import styled from 'styled-components';
import MyPosts from './MyPosts';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';
import MyInfo from './MyInfo';

const Mypage = () => {
  const { storeInfo } = useSelector(state => state.userLogIn);
  const [activeTab, setActiveTab] = useState('info'); // 'info' 또는 'posts'로 초기화

  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  const { profileImg, nickname } = storeInfo;
  
  return (
    <>
      <Navigation />
      <MypageContainer>
        <ImageWrap>
          <UserImage src={profileImg} alt="User Image" />
        </ImageWrap>

        <UserName>{nickname}</UserName>
        <NavigationText>
          <span onClick={() => handleTabChange('info')}>회원정보 보기</span> | <span onClick={() => handleTabChange('posts')}>내가 쓴 게시글</span>
        </NavigationText>
        {/* 내용에 따라 조건부로 컴포넌트를 렌더링 */}
        {activeTab === 'info' && (
          <div>
            <MyInfo />
            {/* 회원정보 표시 */}
          </div>
        )}
        {activeTab === 'posts' && (
          <div>
            <MyPosts />
            {/* 내가 쓴 게시글 표시 */}
          </div>
        )}
      </MypageContainer>
      <Footer />
    </>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
const ImageWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
`;
const UserImage = styled.img`
  width: 100%;
  object-fit: cover;
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
