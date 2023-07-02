import React, { useState } from 'react';
import CreatePostModal from '../components/modal/CreatePostModal';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [reload, setReload] = useState(false);
  const navigation = useNavigate();

  const { isUserTrue } = useSelector(state => state.userLogIn);

  const openModal = () => {
    if (!isUserTrue) {
      return navigation('/login');
    }
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };

  return (
    <BannerWrapper url={'https://github.com/nbc-react-1/nbc-maeily/assets/133937368/79f8a899-05af-4c09-a873-89729975d64d'}>
      <BannerContent>
        <h1>지금 가장 핫한 썸머룩</h1>
        <h2>당신의 매일리룩을 공유해주세요!</h2>
        <button onClick={openModal}>Add Photo</button>
        <CreatePostModal reload={reload} setReload={setReload} isOpen={isOpen} closeModal={closeModal} post={post} setPost={setPost} selectedFile={selectedFile} setSelectedFile={setSelectedFile} contents={contents} setContents={setContents} />
      </BannerContent>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  margin-top: 60px;
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;

  & > h1 {
    font-weight: 900;
    font-size: 40px;
    opacity: 90%;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    margin-bottom: 10px;
  }

  & > h2 {
    font-weight: 500;
    font-size: 25px;
    opacity: 90%;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  }

  & > button {
    padding: 10px 17px;
    border-radius: 5px;
    border: none;
    border: 1px solid black;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    color: black;
    margin-top: 20px;
    background-color: #fff;
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
    z-index: 1;
  }

  & > button:hover::before {
    content: '';
    width: 100%;
    height: 100%;
    color: white;
    position: absolute;
  }
`;

export default Banner;
