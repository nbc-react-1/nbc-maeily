import React, { useState } from 'react';
import { styled, keyframes } from 'styled-components';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import { collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { deleteUser, getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { StP } from '../../components/modal/JoinUserModal';
import { checkTrueColor } from '../../components/modal/JoinUserModal';
import { useDispatch } from 'react-redux';

const MyInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingModal, setSettingModal] = useState(false);
  const [userInfoModifyModal, setUserInfoModifyModal] = useState(false);
  const [pwdModifyModal, setPwdModifyModal] = useState(false);
  const [changeNickname, setChangeNickname] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [changePasswordCheck, setChangePasswordCheck] = useState('');
  const [changeFile, setChangeFile] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordType, setPasswordType] = useState(true);
  const [passwordType2, setPasswordType2] = useState(true);
  const [passwordType3, setPasswordType3] = useState(true);
  const { storeInfo } = useSelector(state => state.userLogIn);

  // 설정 모달 열기
  const openSettingModal = () => setSettingModal(true);

  // 모달창 외부 클릭 시 모달창 닫힘 로직
  const clickOutside = event => {
    setSettingModal(false);
  };

  // 회원정보수정 모달창 열기
  const openUserInfoModal = () => {
    setSettingModal(false);
    setUserInfoModifyModal(true);
  };

  // 회원정보수정 모달창 닫기
  const closeUserInfoModal = () => {
    setUserInfoModifyModal(false);
    setChangeNickname('');
    setCheckNickname(false);
    setChangeFile('');
  };

  // 회원정보수정 로직
  const userInfoUpdate = async () => {
    const matchName = query(collection(db, 'users'));
    const querySnapshot = await getDocs(matchName);
    const userAllInfo = [];
    let overlapNickname;
    await querySnapshot.forEach(doc => {
      userAllInfo.push({ id: doc.id, ...doc.data() });
      console.log("userAllInfo",userAllInfo)
      const nicknameArr = userAllInfo.map(e => e.nickname);
      console.log("storeInfo.nickname",storeInfo.nickname, typeof storeInfo.nickname) 
      console.log("changeNickname",changeNickname, typeof changeNickname)
      console.log("nicknameArr",nicknameArr)
      overlapNickname = storeInfo.nickname === changeNickname ? -1 : nicknameArr.indexOf(changeNickname);
    });
 
    if(overlapNickname === -1){
      const imageRef = ref(storage, `${auth.currentUser.uid}/${changeFile.name}`);
      await uploadBytes(imageRef, changeFile);
      const downloadURL = await getDownloadURL(imageRef);
      const userRef = doc(db, 'users', storeInfo.uid);
    await updateDoc(userRef, changeFile === '' ? { nickname: changeNickname } : { nickname: changeNickname, profileImg: downloadURL });
    alert('회원 정보가 성공적으로 업데이트 되었습니다.');
    window.location.reload()
    }else if (overlapNickname >= 0) {
      alert('이미 존재하는 닉네임 입니다. 다른 닉네임을 사용해 보세요!');
    }
  };

  // 회원탈퇴 로직
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
            signOut(auth);
            dispatch({ type: 'DELETE_USER' });
            navigate('/');
          })
          .catch(error => {
            console.log('errorCode', error.code);
          });
      } else alert('취소 하셨습니다.');
    } else if (pwd === null) alert('취소 하셨습니다.');
    else alert('비밀번호가 일치하지 않습니다.');
    setSettingModal(false);
  };

  // 닉네임 유효성 검사
  const [checkNickname, setCheckNickname] = useState('');
  const nicknameCheck = nickname => {
    if (nickname.length >= 2 && nickname.length <= 16) setCheckNickname(true);
    else setCheckNickname(false);
  };

  // 비밀번호변경 모달 열기
  const openPwdModifyModal = () => {
    setSettingModal(false);
    setPwdModifyModal(true);
  };

  // 비밀번호변경 모달 닫기
  const closePwdModifyModal = () => {
    setPwdModifyModal(false);
    setChangePassword('');
    setChangePasswordCheck('');
    setCheckPassword(false);
    setPasswordType(true);
    setPasswordType2(true);
    setPasswordType3(true);
  };

  // 비밀번호 유효성 검사
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  const passwordCheck = password => {
    if (passwordRegEx.test(password)) setCheckPassword(true);
    else setCheckPassword(false);
  };

  // 비밀번호수정 로직
  const passwordUpdate = async () => {
    if (changePassword !== changePasswordCheck) {
      alert('신규 비밀번호와 재입력 비밀번호가 일치하지 않습니다.');
    } else if (changePassword === changePasswordCheck) {
      if (storeInfo.password === changePassword) {
        alert('현재 비밀번호와 신규 비밀번호가 동일합니다.');
      } else {
        const auth = getAuth();
        const userRef = doc(db, 'users', storeInfo.uid);
        await updateDoc(userRef, { password: changePassword });
        const user = auth.currentUser;
        updatePassword(user, changePassword)
          .then(() => {})
          .catch(error => {
            console.log('errorCode', error.code);
          });
        alert('비밀번호가 정상적으로 변경되었습니다.');
        closePwdModifyModal();
      }
    }
  };

  return (
    <UserInfoContainer>
      <div>
        <Heading>기본 회원 정보</Heading>
        <SettingButton onClick={openSettingModal}>
          <SettingSvg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
          </SettingSvg>
        </SettingButton>
      </div>
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

      {/* 설정 모달  */}
      {settingModal && (
        <ModalOverlay onClick={clickOutside}>
          <SettingModal>
            <SettingContentBox>
              <SettingContentButton onClick={openUserInfoModal}>정보 수정</SettingContentButton>
              <SettingContentButton onClick={userDelete}>회원 탈퇴</SettingContentButton>
              <SettingContentButton onClick={openPwdModifyModal}>비밀번호 변경 </SettingContentButton>
            </SettingContentBox>
          </SettingModal>
        </ModalOverlay>
      )}

      {/* 회원 정보 수정 모달 */}
      {userInfoModifyModal && (
        <Modal onClose={openUserInfoModal}>
          <Sth>회원 정보 수정</Sth>
          <InputContainer>
            <InputLabel>닉네임</InputLabel>
            <Input
              type="text"
              name="nickname"
              value={changeNickname}
              onChange={event => {
                setChangeNickname(event.target.value);
                nicknameCheck(event.target.value);
              }}
              placeholder={storeInfo.nickname}
            />
            {checkNickname === true ? (
              <StP style={checkTrueColor}>사용 가능한 닉네임입니다.</StP>
            ) : changeNickname !== '' ? (
              <StP>2자 이상 16자 내로 입력해 주세요.</StP>
            ) : (
              <StP>
                <br />
              </StP>
            )}
          </InputContainer>
          <InputContainer marginbottom="2rem">
            <InputLabel>이름</InputLabel>
            <Input type="text" name="name" value={storeInfo.name} disabled />
          </InputContainer>
          <InputContainer marginbottom="2rem">
            <InputLabel>이메일</InputLabel>
            <Input type="email" name="email" value={storeInfo.email} disabled />
          </InputContainer>
          <InputContainer marginbottom="2rem">
            <InputLabel>프로필 이미지</InputLabel>
            <Input type="file" name="profileImg" onChange={event => setChangeFile(event.target.files[0])} />
          </InputContainer>
          <FlexContainer>
            <Button onClick={userInfoUpdate} disabled={!checkNickname}>
            변경
            </Button>
            <Button onClick={closeUserInfoModal}>취소</Button>
          </FlexContainer>
        </Modal>
      )}

      {/* 비밀번호 수정 모달 */}
      {pwdModifyModal && (
        <ModalOverlay>
          <SettingModal>
            <PwdModalContent>
              <InputContainer>
                <InputLabel>현재 비밀번호</InputLabel>
                <FlexContainer>
                  <Input type={passwordType ? 'password' : 'text'} defaultValue={storeInfo.password} disabled />
                  <button onClick={() => setPasswordType(!passwordType)} style={{ backgroundColor: 'transparent' }}>
                    {passwordType ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 576 512">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 640 512">
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    )}
                  </button>
                </FlexContainer>
              </InputContainer>
              <InputContainer>
                <InputLabel style={{ marginTop: '25px' }}>신규 비밀번호</InputLabel>
                <FlexContainer>
                  <Input
                    type={passwordType2 ? 'password' : 'text'}
                    value={changePassword}
                    onChange={event => {
                      setChangePassword(event.target.value);
                      passwordCheck(event.target.value);
                    }}
                  />
                  <button onClick={() => setPasswordType2(!passwordType2)} style={{ backgroundColor: 'transparent' }}>
                    {passwordType2 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 576 512">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 640 512">
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    )}
                  </button>
                </FlexContainer>
              </InputContainer>
              {checkPassword === true ? (
                <StP style={checkTrueColor}>사용 가능한 비밀번호입니다.</StP>
              ) : changePassword !== '' ? (
                <StP>영문, 숫자, 특수문자를 조합하여 8-16자 로 입력해주세요.</StP>
              ) : (
                <StP>
                  <br />
                </StP>
              )}
              <InputContainer>
                <InputLabel>신규 비밀번호 재입력</InputLabel>
                <FlexContainer>
                  <Input type={passwordType3 ? 'password' : 'text'} value={changePasswordCheck} onChange={event => setChangePasswordCheck(event.target.value)} />
                  <button onClick={() => setPasswordType3(!passwordType3)} style={{ backgroundColor: 'transparent' }}>
                    {passwordType3 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 576 512">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 640 512">
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    )}
                  </button>
                </FlexContainer>
              </InputContainer>
              <ButtonContainer>
                <Button onClick={passwordUpdate} disabled={!checkPassword}>
                  변경
                </Button>
                <Button onClick={closePwdModifyModal}>취소</Button>
              </ButtonContainer>
            </PwdModalContent>
          </SettingModal>
        </ModalOverlay>
      )}
    </UserInfoContainer>
  );
};

const PwdModalContent = styled.div`
  background-color: #fff;
  padding: 40px 60px 40px 50px;
  width: 500px;
  height: 380px;
  border-radius: 12px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
`;

const SettingModal = styled.div`
  background-color: #fff;
  border-radius: 12px;
`;

const SettingContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SettingContentButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 12px;
  background-color: white;

  &:hover {
    background-color: #d8d8d8;
  }
`;

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
  float: left;
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

const FlexContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled(FlexContainer)`
  margin-top: 35px;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  width: 200px;
  color: white;
  font-weight: 700;
  background-color: ${props => (props.disabled ? '#ebebeb' : '#000;')};
  float: right;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.marginbottom};
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
  width: 100%;
`;

const Sth = styled.h3`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 20px;
`;

const SettingButton = styled.button`
  position: absolute;
  width: 40px;
  height: 30px;
  background-color: transparent;
  top: 17px;
  right: 13px;
`;
const rotation = keyframes`
    100%{
    transform:rotate(180deg);
  }
`;

const SettingSvg = styled.svg`
  fill: #616161;
  &:hover {
    animation: ${rotation} 0.6s linear;
  }
`;

export default MyInfo;
