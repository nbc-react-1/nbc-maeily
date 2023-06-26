import React from 'react';
import { styled } from 'styled-components';
import { StButton, ButtonWrap } from '../components/Button';

const Home = () => {
  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <ul>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
          <li>게시글 리스트</li>
        </ul>
      </div>

      <CreatePost />
    </>
  );
};

const CreatePost = () => {
  return (
    <>
      <ModalBg>
        <ModalContents>
          {/* 수정페이지에서 보여줘야함 */}
          <ButtonWrap style={{ float: 'right' }}>
            <StButton bgColor={'#00e6bf'} acColor={'#00a589'}>
              수정
            </StButton>
            <StButton bgColor={'#00e6bf'} acColor={'#00a589'}>
              삭제
            </StButton>
          </ButtonWrap>

          <form action="" style={{ clear: 'both', overflow: 'hidden' }}>
            <Label>사진 첨부 </Label>
            <Input />
            <Label>내용</Label>
            <InputArea />
          </form>
          <StButton style={{ float: 'right' }} bgColor={'#00e6bf'} acColor={'#00a589'}>
            등록
          </StButton>
        </ModalContents>
      </ModalBg>
    </>
  );
};
export default Home;

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
