import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { deleteUser, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserEdit from '../../components/modal/UserEditModal';

const MyInfo = () => {
  const navigate = useNavigate();

  const { storeInfo } = useSelector(state => state.userLogIn);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const userDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const pwd = prompt('회원 탈퇴를 위해 비밀번호를 입력해 주세요.');
    if (pwd === storeInfo.password) {
      const deleteConfirm = window.confirm('정말로 삭제하시겠습니까?');
      if (deleteConfirm) {
        await deleteDoc(doc(db, 'users', storeInfo.uid));
        await deleteUser(user)
          .then(() => {
            alert('삭제가 정상적으로 처리되었습니다.');
            navigate('/');
          })
          .catch(error => {
            const errorCode = error.code;
            console.log('errorCode', errorCode);
          });
      } else alert('취소 하셨습니다.');
    } else if (pwd === null) alert('취소 하셨습니다.');
    else alert('비밀번호가 일치하지 않습니다.');
  };

  return (
    <UserInfoContainer>
      <Heading>기본 회원 정보</Heading>
      <UserInfoItem>
        <UserInfoLabel>이름</UserInfoLabel>
        <UserInfoValue>{storeInfo && storeInfo.name}</UserInfoValue>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>이메일</UserInfoLabel>
        <UserInfoValue>{storeInfo && storeInfo.email}</UserInfoValue>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>닉네임</UserInfoLabel>
        <UserInfoValue>{storeInfo && storeInfo.nickname}</UserInfoValue>
      </UserInfoItem>
      <ButtonContainer>
        <Button onClick={toggleModal}>회원 정보 수정</Button>
        <Button onClick={userDelete}>회원 탈퇴</Button>
      </ButtonContainer>
      {isModalOpen && <UserEdit onClose={toggleModal} />}
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 0.5rem;
`;

const Heading = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -1.08px;
  color: rgb(33, 37, 41);
`;

const UserInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const UserInfoLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 1rem;
  color: rgb(157, 167, 174);
`;

const UserInfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: 240px;
  border-radius: 12px;
  border: none;
  background: rgb(246, 249, 250);
  box-sizing: border-box;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px 22px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50px;
  border: 1px solid rgb(20, 22, 23);
  color: rgb(20, 22, 23);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid rgb(157, 167, 174);
  font-size: 14px;
`;

export default MyInfo;
