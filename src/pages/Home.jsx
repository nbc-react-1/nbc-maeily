import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { getDocs, collection, query, onSnapshot, doc, orderBy } from 'firebase/firestore';
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
  const { storeInfo } = useSelector(state => state.userLogIn);
  const { uid, nickname } = storeInfo;
  console.log(uid, ' / ', nickname);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };
  const allUser = [];

  // 데이터 리스트로 불러오기
  useEffect(() => {
    const fetchData = async () => {
      // 전체 게시글 불러오기
      const queryValue = query(collection(db, 'post-item'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(queryValue, querySnapshot => {
        const initialPostItem = querySnapshot.docs.map(doc => ({
          postId: doc.id,
          ...doc.data(),
        }));
        setPost(initialPostItem);
      });
      console.log(post);
      return unsubscribe;
    };
    console.log();

    fetchData();
  }, [reload]);

  return (
    <div>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <Banner url={'https://github.com/nbc-react-1/nbc-maeily/assets/133937368/7cfaaf37-d981-4ace-a8a5-8786ae57ea3c'}>
          <BannerContent>
            <h1>로그인 페이지에 넣을 사진 만들게요</h1>
            <h2>배너에 넣을 글 생각해야 될 듯</h2>
            <button onClick={openModal}>Add Photo</button>
          </BannerContent>
        </Banner>
        <StCardContainer>
          {post.map(item => (
            <StCard key={item.id}>
              <StImg>
                <img src={item.photoURL} alt="" />
                <StHover>
                  <StId>{item.id}</StId>
                  <StContent>{item.contents}</StContent>
                  <StNick>{item.nickName}</StNick>
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
  margin-top: 60px;
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 50px;
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
    font-weight: 700;
    font-size: 40px;
    opacity: 85%;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  & > h2 {
    font-weight: 400;
    font-size: 25px;
    opacity: 85%;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
    width: 300px;
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
  padding: 50px 0;

  margin: 0 auto;
  flex-direction: column;
  align-content: flex;
  height: 3000px;
  overflow: hidden;
`;

const StCard = styled.div`
  border: none;
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
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
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
  font-size: 1.4rem;
  margin-bottom: 10px;
`;
const StContent = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
const StNick = styled.p`
  font-size: 0.9rem;
`;
