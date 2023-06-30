import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { getDocs, collection, query, limit } from 'firebase/firestore';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CreatePostModal from '../components/modal/CreatePostModal';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [reload, setReload] = useState(false);

  //리덕스 유저정보 .uid   //파이어스토어
  // const { sucessUserInfo, storeInfo, isUserTrue } = useSelector(state => state.userLogIn);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };

  // 데이터 리스트로 불러오기
  useEffect(() => {
    console.log('Home useEffect');
    console.log(reload, 'reload');
    const initialPostItem = [];
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'));
      const querySnapshot = await getDocs(queryValue);
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialPostItem.push(data);
      });
      setPost(initialPostItem);
    };
    fetchData();
  }, [reload]);

  return (
    <div>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <Banner>
          <img src="https://user-images.githubusercontent.com/129598273/249545123-32c7c939-c760-4751-915a-a176a50f6cd6.png" alt="circle" />
          <img src="https://user-images.githubusercontent.com/129598273/249548740-621cfb33-6f4e-4700-bb5c-cf4113381113.png" alt="circle" />
          <div>
            <h1>Title banner here</h1>
            <h1>Title banner here</h1>
            <button onClick={openModal}>add photo</button>
          </div>
          <BannerImg>
            <span>
              <img src="https://user-images.githubusercontent.com/129598273/249828972-45ded19a-1978-47b8-b35b-89b5c9de9cd7.png" alt="banner" />
              <img src="https://user-images.githubusercontent.com/129598273/249828897-2f5e2fbb-76d5-4dc4-b44c-cb3af34c78d9.png" alt="banner" />
            </span>
          </BannerImg>
        </Banner>
        <StCardContainer>
          {post.map(item => (
            <StCard key={item.id}>
              <StImg>
                <img src={item.photoURL} alt="" />
                <StHover>
                  <StId>{item.id}</StId>
                  <StContent>{item.contents}</StContent>
                </StHover>
              </StImg>
            </StCard>
          ))}
        </StCardContainer>
        <Footer />
      </div>

      {/* modal */}
      <CreatePostModal reload={reload} setReload={setReload} isOpen={isOpen} closeModal={closeModal} post={post} setPost={setPost} selectedFile={selectedFile} setSelectedFile={setSelectedFile} contents={contents} setContents={setContents} />
    </div>
  );
};

export default Home;

// banner
const Banner = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > img {
    position: absolute;
    width: 500px;
    right: 40px;
    top: 60px;
  }
  & > img:nth-child(2) {
    position: absolute;
    width: 300px;
    left: -30px;
    top: 0px;
  }

  & > div {
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > div > h1 {
    font-weight: 900;
    font-size: 40px;
  }

  & > div > button {
    border: 1px solid black;
    padding: 10px 17px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 13px;
    color: #f4f5f9;
    background-color: #121212;
    margin-top: 40px;
  }
`;

const BannerImg = styled.div`
  & > span {
    display: flex;
    position: relative;
  }
  & > span > img:nth-child(1) {
    width: 300px;
    z-index: 1;
    position: relative;
    left: 20px;
    bottom: -20px;
  }
  & > span img:nth-child(2) {
    width: 300pxq;
    z-index: 0;
    position: relative;
  }
`;

const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 1300px;
  min-width: 800px;
  padding-top: 50px;

  margin: 0 auto;
  flex-direction: column;
  align-content: flex;
  height: 3000px;
  overflow: hidden;
`;

const StCard = styled.div`
  border: none;
  cursor: pointer;
  width: calc((100% - 90px) / 4);
  position: relative;

  flex: 0 0 150px;
  flex-basis: 100px;
`;

const StImg = styled.div`
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }
`;

const StHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const StId = styled.h4`
  font-weight: bold;
  font-size: 20px;
  // margin-bottom: 10px;
`;

const StContent = styled.p`
  font-size: 14px;
  text-align: center;
`;
