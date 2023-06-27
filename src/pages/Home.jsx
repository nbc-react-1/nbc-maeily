import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { StButton, ButtonWrap } from '../components/Button';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { app, db, storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const Home = () => {
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
    {
      id: 2,
      image: 'url?',
      contents: '내용입니다',
    },
    {
      id: 3,
      image: 'url?',
      contents: '내용입니다',
    },
  ]);
  // 데이터 리스트로 불러오기
  useEffect(() => {
    const initialPostItem = [];
    const fetchData = async () => {
      // const queryValue = query();
      const querySnapshot = await getDocs(collection(db, 'post-item'));

      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log('data', data);
        initialPostItem.push(data);
      });
    };
    // fetchData();
    setPost(initialPostItem);
  }, []);

  //게시글 등록
  const [contents, setContents] = useState('');
  // const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const selectFile = event => {
    setSelectedFile(event.target.files[0]);
  };
  // 사진올리기
  const addPost = async e => {
    e.preventDefault();
    const imageRef = ref(storage, 'folder/file');
    uploadBytes(imageRef, selectedFile);
  };
  // 글올리기
  const postHandler = async e => {
    e.preventDefault();
    const newAddPost = {
      selectedFile,
      contents,
    };
    // const newPostList = [...post, newAddPost];
    // setPost(newPostList); //화면에 보여주는 추가
    const collectionRef = collection(db, 'post-item');
    await addDoc(collectionRef, newAddPost);
    setSelectedFile('');
    setContents('');
  };

  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <StBanner>
          <StH1>maeilyLook</StH1>
        </StBanner>
        <StCardContainer>
          {post.map(item => {
            return (
              <StCard>
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
        <ModalBg>
          <ModalContents>
            {/* 수정페이지에서 보여줘야함 */}
            <ButtonWrap style={{ float: 'right' }}>
              <StButton acColor={'#39ddc2'}>수정</StButton>
              <StButton acColor={'#39ddc2'}>삭제</StButton>
            </ButtonWrap>

            <form onSubmit={postHandler} style={{ clear: 'both', overflow: 'hidden' }}>
              <Label>사진 첨부 </Label>
              <Input type="file" onChange={selectFile} />
              <Label>내용</Label>
              <InputArea
                value={contents}
                onChange={event => {
                  setContents(event.target.value);
                }}
              />
              <StButton type="submit" onClick={addPost} style={{ float: 'right' }} acColor={'#39ddc2'}>
                등록
              </StButton>
            </form>
          </ModalContents>
        </ModalBg>
      </div>
    </>
  );
};
export default Home;
const StBanner = styled.div`
  background-color: black;
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
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
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
