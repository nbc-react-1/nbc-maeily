import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const UserEdit = ({ onClose }) => {
  const { storeInfo } = useSelector(state => state.userLogIn);

  const [changeNickname, setChangeNickname] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [changeFile, setChangeFile] = useState(null);

  const handleUpdate = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${changeFile.name}`);
    await uploadBytes(imageRef, changeFile);
    const downloadURL = await getDownloadURL(imageRef);
    const userRef = doc(db, 'users', storeInfo.uid);
    await updateDoc(userRef, { nickname: changeNickname, profileImg: downloadURL });
    alert('회원 정보가 성공적으로 업데이트되었습니다.');
    window.location.reload();
  };

  return (
    <Modal onClose={onClose}>
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
      <InputContainer>
        <InputLabel>비밀번호</InputLabel>
        <Input type="password" name="password" onChange={event => setChangePassword(event.target.value)} />
      </InputContainer>
      <InputContainer>
        <InputLabel>프로필 이미지</InputLabel>
        <Input type="file" name="profileImg" onChange={event => setChangeFile(event.target.files[0])} />
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleUpdate}>저장</Button>
        <Button onClick={onClose}>취소</Button>
      </ButtonContainer>
    </Modal>
  );
};

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

export default UserEdit;
