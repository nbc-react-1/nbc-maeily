import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyPosts from '../components/mypage/MyPosts';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MyInfo from '../components/mypage/MyInfo';
import Layout from '../components/Layout';

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
      <Layout>
        <MypageContainer>
          <ImageWrap src={profileImg}></ImageWrap>

          <UserName>{nickname}</UserName>
          <NavigationText>
            <span onClick={() => handleTabChange('info')}>회원정보 보기</span> | <span onClick={() => handleTabChange('posts')}>내가 쓴 게시글</span>
          </NavigationText>
          {activeTab === 'info' && (
            <div>
              <MyInfo />
            </div>
          )}
          {activeTab === 'posts' && (
            <div>
              <MyPosts />
            </div>
          )}
        </MypageContainer>
      </Layout>

      <Footer />
    </>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ImageWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
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
