import React, { useRef, useState } from 'react';
import moment from 'moment/moment';
import { styled } from 'styled-components';
import { createPortal } from 'react-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../../firebase';
import { useSelector } from 'react-redux';

function EditPostModal({ isOpen, closeModal, eachItemId, eachItemContent, imgFile, setImgFile }) {
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { storeInfo } = useSelector(state => state.userLogIn);
  const imgRef = useRef();

  const editPostHandler = async event => {
    event.preventDefault();
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (selectedFile === null) {
      const docRef = doc(db, 'post-item', eachItemId);
      await updateDoc(docRef, {
        uid: auth.currentUser.uid,
        contents,
        photoURL: imgFile,
        date: nowTime,
        nickName: storeInfo.nickname,
      });
    } else {
      const storageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile?.name}`);
      uploadBytes(storageRef, selectedFile).then(snapshot => {
        getDownloadURL(storageRef).then(async url => {
          const docRef = doc(db, 'post-item', eachItemId);
          await updateDoc(docRef, {
            uid: auth.currentUser.uid,
            contents,
            photoURL: url,
            date: nowTime,
            nickName: storeInfo.nickname,
          });
        });
      });
    }

    closeModal();
  };

  // 사진 변경
  const handleChangeFile = e => {
    if (e.target.files.length === 0) {
      return '';
    } else {
      const file = imgRef.current.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
      } else {
        return;
      }
    }
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
            <StPostH2>게시글 수정</StPostH2>
            <StModalCloseButton onClick={closeModal}>
              <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </StSvg>
            </StModalCloseButton>

            <EditForm onSubmit={editPostHandler}>
              <InputImgContainer>
                <input style={{ display: 'none' }} name="file" id="file" type="file" ref={imgRef} onChange={handleChangeFile} />
                <InputImg url={imgFile}>
                  <ImgLabel required htmlFor="file">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 640 512" style={{ fill: 'black', marginRight: 10 }}>
                      <path d="M256 0H576c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64zM476 106.7C471.5 100 464 96 456 96s-15.5 4-20 10.7l-56 84L362.7 169c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h80 48H552c8.9 0 17-4.9 21.2-12.7s3.7-17.3-1.2-24.6l-96-144zM336 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM64 128h96V384v32c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V384H512v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64zm8 64c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V312c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H72zm336 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H424c-8.8 0-16 7.2-16 16z" />
                    </svg>
                  </ImgLabel>
                </InputImg>

                <InputArea placeholder={eachItemContent} value={contents} onChange={event => setContents(event.target.value)} />
              </InputImgContainer>
              <Button type="submit" style={{ float: 'right' }}>
                등록
              </Button>
            </EditForm>
          </ModalContents>
        </ModalBg>
      )}
    </div>,
    document.getElementById('portal-root'),
  );
}
export default EditPostModal;
const StPostH2 = styled.h2`
  font-weight: bold;
  font-size: 15px;
  margin: 0 0 20px 0;
  font-family: sans-serif;
`;
// modal
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
`;
const ModalContents = styled.div`
  width: 50%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
  @media only screen and (max-width: 890px) {
    width: 90%;
  }
`;
// 모달 컴포넌트
const EditForm = styled.form`
  clear: both;
`;
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
const Input = styled.input`
  width: 100%;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
`;
const InputArea = styled.textarea`
  width: 300px;
  height: 50px;
  border: 0;
  border: none;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 25px;
  resize: none;
  position: absolute;
  bottom: -80px;

  &:focus {
    outline: none;
  }
`;

// button
const Button = styled.button`
  padding: 10px 17px;
  margin: 5px 10px;
  border-radius: 5px;
  border: none;
  border: 1px solid black;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: black;
  background-color: transparent;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const InputImg = styled.div`
  width: 300px;
  height: 400px;
  background-color: #f4f5f9;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  background-image: url(${props => props.url});
  opacity: 0.7;
  position: relative;
`;

const InputImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
`;

const ImgLabel = styled.label`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 5px;
  cursor: pointer;
`;
