import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { StButton, ButtonWrap } from '../components/Button';
import { getDocs, collection, addDoc, query } from 'firebase/firestore';
import { app, auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Navigation from '../components/Navigation';

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [post, setPost] = useState([
    {
      id: 0,
      image: 'url?',
      contents: '내용입니다',
    },
    {
      id: 1,
      image: 'url?',
      contents: '내용입니다',
    },
  ]);
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
        console.log('data =>', data);
        initialPostItem.push(data);
      });
      setPost(initialPostItem);
    };
    fetchData();
  }, []);

  //게시글 등록
  const [contents, setContents] = useState('');
  const contentsOnchange = event => setContents(event.target.value);
  const [selectedFile, setSelectedFile] = useState(null);
  const selectFile = event => setSelectedFile(event.target.files[0]);
  // 사진올리기
  const addPost = async event => {
    event.preventDefault();
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    console.log('downloadURL', downloadURL);
  };
  // 글올리기***********
  const handlerPost = async event => {
    event.preventDefault();
    const newAddPost = {
      imageUrl: addPost.downloadURL,
      contents,
    };
    console.log(newAddPost);
    // const newPostList = [...post, newAddPost];
    // setPost(newPostList); //화면에 보여주는 추가
    const collectionRef = collection(db, 'post-item');
    await addDoc(collectionRef, newAddPost);
    setSelectedFile(null);
    setContents('');
  };

  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <StBanner>
          <button onClick={openModal}>글작성하기 일단여기 넣어둠요 ㅎㅎ</button>
          <StH1>maeilyLook</StH1>
        </StBanner>
        <StCardContainer>
          {post.map(item => {
            return (
              <StCard key={item.id}>
                <StImg src="" alt={item.image} />
                <StId>{item.id}</StId>
                <StContent>{item.contents}</StContent>
              </StCard>
            );
          })}
        </StCardContainer>
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
              {/* <ButtonWrap style={{ float: 'right' }}>
              <StButton acColor={'#39ddc2'}>수정</StButton>
              <StButton acColor={'#39ddc2'}>삭제</StButton>
            </ButtonWrap> */}

              {/* 모달 닫기 버튼 */}
              <StModalCloseButton onClick={closeModal}>
                <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </StSvg>
              </StModalCloseButton>

              <form onSubmit={handlerPost} style={{ clear: 'both', overflow: 'hidden' }}>
                <Label>사진 첨부 </Label>
                <Input type="file" onChange={selectFile} />
                <Label>내용</Label>
                <InputArea value={contents} onChange={contentsOnchange} />
                <StButton type="submit" onClick={addPost} style={{ float: 'right' }}>
                  등록
                </StButton>
              </form>
            </ModalContents>
          </ModalBg>
        )}
      </div>
    </>
  );
};
export default Home;
const StBanner = styled.div`
  background-color: #c4c4c4;
  height: 200px;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
`;
const StH1 = styled.h1`
  color: white;
  font-size: 50px;
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
  width: 300px;
  height: 500px;
  cursor: pointer;
`;
const StImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;
const StId = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
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
