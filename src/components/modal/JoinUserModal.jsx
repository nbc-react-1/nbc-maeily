import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import Modal from '../Modal';

const JoinUserModal = () => {
  const emailRef = useRef('');
  const nicknameRef = useRef('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [nickname, setNickname] = useState('');

  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkname, setCheckname] = useState('');
  const [checkNickname, setCheckNickname] = useState('');

  // 회원정보 정규표현식 필터
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  const nameRegEx = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣]{2,16}$/;

  // 검사 전부 true 시 '가입하기' 버튼 활성화(disabled = false)
  // 이메일 유효성 검사
  const emailCheck = email => {
    if (emailRegEx.test(email)) setCheckEmail(true);
    else setCheckEmail(false);
  };
  // 비밀번호 유효성 검사
  const passwordCheck = password => {
    if (passwordRegEx.test(password)) setCheckPassword(true);
    else setCheckPassword(false);
  };
  // 아이디 유효성 검사
  const nameCheck = name => {
    if (nameRegEx.test(name)) setCheckname(true);
    else setCheckname(false);
  };
  // 닉네임 유효성 검사
  const nicknameCheck = nickname => {
    if (nickname.length >= 2 && nickname.length <= 16) setCheckNickname(true);
    else setCheckNickname(false);
  };

  // 모달창 true, false
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  // 모달창 닫으면 input 값들 초기화
  const closeModal = () => {
    setIsOpen(false);
    setEmail('');
    setPassword('');
    setname('');
    setNickname('');
    setCheckEmail('');
    setCheckPassword('');
    setCheckname('');
    setCheckNickname('');
  };

  // 회원가입 유효성 검사 후 처리
  const signUp = async event => {
    event.preventDefault();
    try {
      const matchName = query(collection(db, 'users'));
      const querySnapshot = await getDocs(matchName);
      const initialUsers = [];
      let overlapNickname;
      await querySnapshot.forEach(doc => {
        initialUsers.push({ id: doc.id, ...doc.data() });
        const nicknameArr = initialUsers.map(e => e.nickname);
        overlapNickname = nicknameArr.indexOf(nickname);
      });
      if (overlapNickname === -1 || overlapNickname === undefined) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('userCredential', userCredential);
        const newUsers = { uid: userCredential.user.uid, email, password, nickname, name, profileImg: 'https://firebasestorage.googleapis.com/v0/b/maily-acc5a.appspot.com/o/default.png?alt=media&token=2b70c710-11c6-444b-a416-df5db34da880' };
        setDoc(doc(db, 'users', userCredential.user.uid), newUsers);
        if (userCredential) alert('회원가입이 정상적으로 처리되었습니다!');
        closeModal();
      } else if (overlapNickname >= 0) {
        alert('이미 존재하는 닉네임 입니다. 다른 닉네임을 사용해 보세요!');
        nicknameRef.current.focus();
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') alert('이미 존재하는 이메일 주소 입니다. 다른 이메일 주소를 이용해 주세요!');
      emailRef.current.focus();
    }
  };

  return (
    <div>
      <OpenModalButton onClick={openModal}>Sign Up</OpenModalButton>
      {isOpen && (
        <Modal>
          <div>
            <StModalHeader>
              <img src="/maeily-logo.png" alt="logo" style={{ width: '200px' }} />
              <ModalCloseButton onClick={closeModal}>
                <CloseButtonSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </CloseButtonSvg>
              </ModalCloseButton>
            </StModalHeader>
            <form>
              <div>
                <StLabel>이메일 주소</StLabel>
                <div>
                  <StInput
                    type="text"
                    placeholder="예) maeily@maeily.com"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      emailCheck(e.target.value);
                    }}
                    ref={emailRef}
                    autoFocus
                  />
                </div>
                {checkEmail === true ? (
                  <StP style={checkTrueColor}>사용 가능한 이메일입니다.</StP>
                ) : email !== '' ? (
                  <StP>이메일 주소를 정확히 입력해주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
              </div>
              <div>
                <StLabel>비밀번호</StLabel>
                <div>
                  <StInput
                    type="password"
                    placeholder="영문, 숫자, 특수문자 조합 8-16자"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      passwordCheck(e.target.value);
                    }}
                  />
                </div>
                {checkPassword === true ? (
                  <StP style={checkTrueColor}>사용 가능한 비밀번호입니다.</StP>
                ) : password !== '' ? (
                  <StP>영문, 숫자, 특수문자를 조합하여 8-16자 로 입력해주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
              </div>
              <div>
                <StLabel>이름</StLabel>
                <div>
                  <StInput
                    type="text"
                    value={name}
                    onChange={e => {
                      setname(e.target.value);
                      nameCheck(e.target.value);
                    }}
                  />
                </div>
                {checkname === true ? (
                  <StP style={checkTrueColor}>사용 가능한 이름입니다.</StP>
                ) : name !== '' ? (
                  <StP>2자 이상 16자 내 영어, 한글로 구성해주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
              </div>

              <div>
                <StLabel>닉네임</StLabel>
                <div>
                  <StInput
                    type="text"
                    value={nickname}
                    onChange={e => {
                      setNickname(e.target.value);
                      nicknameCheck(e.target.value);
                    }}
                    ref={nicknameRef}
                  />
                </div>
                {checkNickname === true ? (
                  <StP style={checkTrueColor}>사용 가능한 닉네임입니다.</StP>
                ) : nickname !== '' ? (
                  <StP>2자 이상 16자 내로 입력해 주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
              </div>
            </form>
          </div>
          <JoinButton disabled={checkEmail && checkPassword && checkNickname && checkname ? false : true} onClick={signUp}>
            가입하기
          </JoinButton>
        </Modal>
      )}
    </div>
  );
};
export const checkTrueColor = {
  color: '#14aaff',
};

const OpenModalButton = styled.button`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  color: #f4f5f9;
  background-color: #121212;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
`;

const JoinButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  width: 200px;
  color: white;
  font-weight: 700;
  background-color: ${props => (props.disabled ? '#ebebeb' : '#000;')};
  float: right;
  margin: 15px 0 0 10px;
`;
const StModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
export const ModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 38px;
  position: relative;
  top: -48px;
  left: 20%;
  height: 40px;
`;
export const CloseButtonSvg = styled.svg`
  fill: #7c7c7c;
  transition: scale 0.3s;
  &:hover {
    fill: #000;
    scale: 1.2;
  }
`;

const StInput = styled.input`
  border: none;
  outline: none;
  width: 95%;
  font-size: 15px;
  padding: 8px;
  border-bottom: 1px solid #ebebeb;
  &:focus {
    border-bottom: 2px solid #000;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const StLabel = styled.h2`
  margin: 8px;
  font-size: 13px;
`;
export const StP = styled(StLabel)`
  color: red;
`;

export default JoinUserModal;
