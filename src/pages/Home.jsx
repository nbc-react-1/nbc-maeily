import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDocs, addDoc, collection, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { StButton, ButtonWrap } from '../components/Button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import moment from 'moment/moment';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [edit, setEdit] = useState(false);

  //리덕스 유저정보 .uid  //파이어스토어
  const { sucessUserInfo, storeInfo, isUserTrue } = useSelector(state => state.userLogIn);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setContents('');
    setSelectedFile(null);
  };

  // 데이터 리스트로 불러오기
  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [post]);

  // 게시글 등록
  const selectFile = event => setSelectedFile(event.target.files[0]);
  const contentsOnchange = event => setContents(event.target.value);

  const addPostHandler = async event => {
    event.preventDefault();
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const storageRef = ref(storage, `images/${selectedFile.name}`);

    uploadBytes(storageRef, selectedFile).then(snapshot => {
      getDownloadURL(storageRef).then(async url => {
        const collectionRef = collection(db, 'post-item');
        await addDoc(collectionRef, {
          uid: auth.currentUser.uid,
          contents,
          photoURL: url,
          date: nowTime,
          // nickname: storeInfo.nickname,
        });
      });
    });
    closeModal();
  };

  return (
    <div>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <Banner>
          <img src="https://user-images.githubusercontent.com/129598273/249545123-32c7c939-c760-4751-915a-a176a50f6cd6.png" alt="circle" />
          <img src="https://user-images.githubusercontent.com/129598273/249548740-621cfb33-6f4e-4700-bb5c-cf4113381113.png" alt="circle" />

          {/* <svg width="646" height="646" viewBox="0 0 646 646" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="322.5" stroke="black" />
          </svg> */}

          <div>
            <h1>Title banner here</h1>
            <h1>Title banner here</h1>
            <button onClick={openModal}>add photo</button>
          </div>
          <BannerImg>
            <img src="https://user-images.githubusercontent.com/129598273/249558941-2a814bad-dc14-40d7-a4ce-013c1a04234f.png" alt="banner" />
          </BannerImg>
        </Banner>
        <StCardContainer>
          {post.map(item => {
            return (
              <StCard key={item.id} onClick={openModal}>
                <StImg>
                  <img src={item.photoURL} alt="" />
                </StImg>
                <StContents>
                  <StId>{item.id}</StId>
                  <StContent>{item.contents}</StContent>
                </StContents>
              </StCard>
            );
          })}
        </StCardContainer>
        <Footer />
      </div>

      {/* modal */}
      <div>
        {isOpen && (
          <ModalBg onClick={closeModal}>
            <ModalContents
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {/* 수정페이지에서 보여줘야함 */}
              {isUserTrue && (
                <ButtonWrap style={{ float: 'right' }}>
                  <StButton acColor={'#39ddc2'}>수정</StButton>
                  <StButton acColor={'#39ddc2'}>삭제</StButton>
                </ButtonWrap>
              )}

              {/* 모달 닫기 버튼 */}
              <StModalCloseButton onClick={closeModal}>
                <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </StSvg>
              </StModalCloseButton>

              <form onSubmit={addPostHandler} style={{ clear: 'both', overflow: 'hidden' }}>
                <Label>사진 첨부 </Label>
                <Input type="file" onChange={selectFile} />
                <Label>내용</Label>
                <InputArea value={contents} onChange={contentsOnchange} />
                <StButton type="submit" style={{ float: 'right' }}>
                  등록
                </StButton>
              </form>
            </ModalContents>
          </ModalBg>
        )}
      </div>
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

  & > img:nth-child(1) {
    position: absolute;
    width: 500px;
    right: 40px;
    top: 40px;
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
  & > img {
    width: 300px;
    z-index: 0;
  }
`;

// list style
const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1300px;
  min-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
`;
const StCard = styled.div`
  border: none;
  width: calc((100% - 90px) / 4);
  cursor: pointer;
`;
const StImg = styled.div`
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
const StContents = styled.div`
  width: 100%;
  padding: 20px 0;
`;
const StId = styled.h4`
  width: 100%;
  padding: 5px 0;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
`;

// modal
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
`;
const ModalContents = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
`;
// 모달 닫기 컴포넌트
const StModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 38px;
  position: absolute;
  top: 6px;
  right: 0px;
`;
const StSvg = styled.svg`
  fill: #7c7c7c;
  transition: scale 0.3s;
  &:hover {
    fill: #000;
    scale: 1.2;
  }
`;
const Label = styled.label`
  width: 100%;
  display: block;
  line-height: 35px;
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
`;
const InputArea = styled.textarea`
  width: 100%;
  height: 300px;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 25px;
`;
