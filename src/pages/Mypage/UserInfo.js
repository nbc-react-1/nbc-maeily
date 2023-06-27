import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';

const UserInfo = () => {
  const userData = {
    name: '전수정',
    email: 'suzzjeon@example.com',
    password: '********',
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <UserInfoContainer>
      <Heading>기본 회원 정보</Heading>
      <UserInfoItem>
        <UserInfoLabel>Name:</UserInfoLabel>
        <UserInfoValue>{userData.name}</UserInfoValue>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>Email:</UserInfoLabel>
        <UserInfoValue>{userData.email}</UserInfoValue>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>Password:</UserInfoLabel>
        <UserInfoValue>{userData.password}</UserInfoValue>
      </UserInfoItem>
      <ButtonContainer>
        {/* <Button onClick={handleEdit}>정보 수정</Button> */}
        <Button onClick={toggleModal}>회원 탈퇴</Button>
      </ButtonContainer>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <h3>회원 탈퇴</h3>
          <p>잠시만요! 이대로 탈퇴하시면 저희는 망합니다. 정말 탈퇴하시겠어요? </p>
          <Button onClick={handleDelete}>탈퇴 진행</Button>
          <Button onClick={toggleModal}>회원 유지</Button>
        </Modal>
      )}
    </UserInfoContainer>
  );
};

export default UserInfo;

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
