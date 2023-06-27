import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import List from '../components/List';
import { StButton, ButtonWrap } from '../components/Button';
import { app } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <StBanner>
          <StH1>maeilyLook</StH1>
        </StBanner>
        <List />
      </div>

      <CreatePost />
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

const CreatePost = () => {
  useEffect(() => {
    console.log('app', app);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'post-item'));
      const initialPostItem = [];
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <ModalBg>
        <ModalContents>
          {/* 수정페이지에서 보여줘야함 */}
          <ButtonWrap style={{ float: 'right' }}>
            <StButton acColor={'#39ddc2'}>수정</StButton>
            <StButton acColor={'#39ddc2'}>삭제</StButton>
          </ButtonWrap>

          <form action="" style={{ clear: 'both', overflow: 'hidden' }}>
            <Label>사진 첨부 </Label>
            <Input />
            <Label>내용</Label>
            <InputArea />
          </form>
          <StButton style={{ float: 'right' }} acColor={'#39ddc2'}>
            등록
          </StButton>
        </ModalContents>
      </ModalBg>
    </>
  );
};

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
