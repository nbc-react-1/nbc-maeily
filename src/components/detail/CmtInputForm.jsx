import React from 'react';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { styled } from 'styled-components';

function CmtInputForm({ cmtContents, setCmtContents, cmtChangeHandler, nowTime, postData }) {
  const { storeInfo } = useSelector(state => state.userLogIn);

  const addComment = async event => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'comments'), {
        uid: storeInfo.uid,
        cmtContents,
        date: nowTime,
        nickName: storeInfo.nickname,
        profileImg: storeInfo.profileImg,
        postId: postData.postId,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setCmtContents('');
  };
  return (
    <CommentSection>
      <CommentForm onSubmit={addComment}>
        <CommentInputLabel htmlFor="">댓글 입력</CommentInputLabel>
        <CommentInput value={cmtContents} onChange={cmtChangeHandler} type="text" />
        <StButton type="submit">등록</StButton>
      </CommentForm>
    </CommentSection>
  );
}

export default CmtInputForm;

// 댓글 입력 폼
const CommentSection = styled.div``;
const CommentForm = styled.form`
  margin: 40px 0;
  min-width: 400px;
`;
const CommentInputLabel = styled.label`
  display: block;
  width: 100%;
  font-size: 0.8rem;
  color: #8a8a8a;

  min-width: 400px;
`;
const CommentInput = styled.input`
  width: 80%;
  border: 0;
  line-height: 1.4;
  padding: 5px 2px;
  border-bottom: solid 1px #efefef;
  margin-right: 20px;
  &:focus {
    outline: 0;
  }
`;
const StButton = styled.button`
  width: calc(20% - 20px);
  padding: 10px 17px;
  border-radius: 5px;
  border: none;
  border: 1px solid black;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: black;
  background-color: #fff;
  position: relative;

  &::before {
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
  &:hover {
    color: #fff;
    z-index: 1;
  }
  &:hover::before {
    content: '';
    width: 100%;
    min-width: 100%;
    height: 100%;
    color: white;
    position: absolute;
  }
`;
