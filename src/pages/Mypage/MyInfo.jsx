import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { deleteUser, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const MyInfo = () => {
  const navigate = useNavigate();

  const { storeInfo } = useSelector(state => state.userLogIn);

  const [isModalOpen, setModalOpen] = useState(false);
  const [changeNickname, setChangeNickname] = useState('');
  // const [changePassword, setChangePassword] = useState('');
  const [changeFile, setChangeFile] = useState(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleUpdate = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${changeFile.name}`);
    await uploadBytes(imageRef, changeFile);
    const downloadURL = await getDownloadURL(imageRef);
    const userRef = doc(db, 'users', storeInfo.uid);
    await updateDoc(userRef, { nickname: changeNickname, profileImg: downloadURL });
    alert('회원 정보가 성공적으로 업데이트되었습니다.');
    window.location.reload();
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
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <h3>회원 정보 수정</h3>
          <InputContainer>
            <InputLabel>닉네임</InputLabel>
            <Input type="text" name="nickname" onChange={event => setChangeNickname(event.target.value)} placeholder={storeInfo.nickname} />
          </InputContainer>
          <InputContainer>
            <InputLabel>이름</InputLabel>
            <Input type="text" name="name" value={storeInfo.name} disabled />
          </InputContainer>
          <InputContainer>
            <InputLabel>이메일</InputLabel>
            <Input type="email" name="email" value={storeInfo.email} disabled />
          </InputContainer>
          {/* <InputContainer>
            <InputLabel>비밀번호</InputLabel>
            <Input type="password" name="password" onChange={event => setChangePassword(event.target.value)} />
          </InputContainer> */}
          <InputContainer>
            <InputLabel>프로필 이미지</InputLabel>
            <Input type="file" name="profileImg" onChange={event => setChangeFile(event.target.files[0])} />
          </InputContainer>
          <ButtonContainer>
            <Button onClick={handleUpdate}>저장</Button>
            <Button onClick={toggleModal}>취소</Button>
          </ButtonContainer>
        </Modal>
      )}
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
