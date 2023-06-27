import React, { useState } from 'react';
import { styled } from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const JoinUserModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [nickname, setNickname] = useState('');

  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkname, setCheckname] = useState('');
  const [checkNickname, setCheckNickname] = useState('');

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  const nicknameRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,16}$/;
  const nameRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,16}$/;

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
    if (nicknameRegEx.test(nickname)) setCheckNickname(true);
    else setCheckNickname(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const signUp = async event => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUsers = { email, password, nickname, name, profileImg: 'default.png' };
      console.log(newUsers);
      const collectionRef = collection(db, 'users');
      addDoc(collectionRef, newUsers);
      if (userCredential) alert('회원가입이 정상적으로 처리되었습니다!');
      console.log('userCredential', userCredential);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') alert('이미 존재하는 이메일 입니다.');
    }
  };

  return (
    <div>
      <StButton onClick={openModal}>회원가입</StButton>
      {isOpen && (
        <StModalBox>
          <StModalContents>
            <div>
              <StModalHeader>
                <img src="https://user-images.githubusercontent.com/129598273/248737302-ce620d30-836f-47dd-b0d8-bdccbb63931d.png" alt="logo" />
                <StModalCloseButton onClick={closeModal}>
                  <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                  </StSvg>
                </StModalCloseButton>
              </StModalHeader>
              <form>
                <div>
                  <StInputDiv>
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
                      />
                    </div>
                    {checkEmail === false && <StP>이메일 주소를 정확히 입력해주세요.</StP>}
                  </StInputDiv>

                  <StInputDiv>
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
                    {checkPassword === false && <StP>영문, 숫자, 특수문자를 조합하여 8-16자 로 입력해주세요.</StP>}
                  </StInputDiv>

                  <StInputDiv>
                    <StLabel>이름</StLabel>
                    <div>
                      <StInput
                        type="text"
                        placeholder="3자 이상의 영어, 숫자, 한글로 구성"
                        value={name}
                        onChange={e => {
                          setname(e.target.value);
                          nameCheck(e.target.value);
                        }}
                      />
                    </div>
                    {checkNickname === false && <StP>3자 이상의 영어, 숫자, 한글로 구성해주세요.</StP>}
                  </StInputDiv>

                  <StInputDiv>
                    <StLabel>닉네임</StLabel>
                    <div>
                      <StInput
                        type="text"
                        placeholder="3자 이상의 영어, 숫자, 한글로 구성"
                        value={nickname}
                        onChange={e => {
                          setNickname(e.target.value);
                          nicknameCheck(e.target.value);
                        }}
                      />
                    </div>
                    {checkNickname === false && <StP>3자 이상의 영어, 숫자, 한글로 구성해주세요.</StP>}
                  </StInputDiv>
                </div>
              </form>
              <StSubmitButton disabled={checkEmail && checkPassword && checkNickname && checkname? false : true} id="submit-button" onClick={signUp}>
                가입하기
              </StSubmitButton>
            </div>
          </StModalContents>
        </StModalBox>
      )}
    </div>
  );
};

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;
const StModalContents = styled.div`
  background-color: #fff;
  padding: 40px 60px 40px 50px;
  width: 400px;
  height: 50%;
  border-radius: 12px;
`;
const StButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  width: 200px;
  color: white;
  font-weight: 700;
`;

const StSubmitButton = styled.button`
  position: relative;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  width: 200px;
  color: white;
  font-weight: 700;
  background-color: ${props => (props.disabled ? '#ebebeb' : '#000;')};
  left: 55%;
  top: 40px;
`;
const StModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const StModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 38px;
  position: relative;
  top: -48px;
  left: 17%;
  height: 40px;
`;
const StSvg = styled.svg`
  fill: #7c7c7c;
  transition: scale 0.3s;
  &:hover {
    fill: #000;
    scale: 1.2;
  }
`;
const StInputDiv = styled.div`
  padding: 0;
`;
const StInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
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
const StP = styled.h2`
  margin: 8px;
  font-size: 13px;
  color: red;
`;

export default JoinUserModal;
