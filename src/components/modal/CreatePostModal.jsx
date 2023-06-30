import React from 'react';
import { styled } from 'styled-components';
import moment from 'moment/moment';
import { createPortal } from 'react-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { StButton } from '../Button';

function CreatePostModal({ isOpen, closeModal, selectedFile, setSelectedFile, contents, setContents, setReload, reload }) {
  // 게시글 등록
  const selectFile = event => setSelectedFile(event.target.files[0]);
  const contentsOnchange = event => setContents(event.target.value);

  const addPostHandler = async event => {
    event.preventDefault();
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const storageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    uploadBytes(storageRef, selectedFile).then(snapshot => {
      getDownloadURL(storageRef).then(async url => {
        const collectionRef = collection(db, 'post-item');
        console.log('123', auth.currentUser);
        await addDoc(collectionRef, {
          uid: auth.currentUser.uid,
          contents,
          photoURL: url,
          date: nowTime,
        });
      });
    });
    closeModal();
  };

  return createPortal(
    <div>
      {isOpen && (
        <ModalBg onClick={closeModal}>
          <ModalContents
            onClick={event => {
              event.stopPropagation();
            }}
          >
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
              <Button onClick={() => setReload(!reload)} type="submit" style={{ float: 'right' }}>
                등록
              </Button>
            </form>
          </ModalContents>
        </ModalBg>
      )}
    </div>,
    document.getElementById('portal-root'),
  );
}
export default CreatePostModal;

// modal
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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

// button
const Button = styled.button`
  padding: 10px 22px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50px;
  border: 1px solid rgb(20, 22, 23);
  color: rgb(20, 22, 23);
`;
