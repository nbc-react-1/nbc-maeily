import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Login = () => {
  const navigation = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSignIn = async e => {
    e.preventDefault();
    setLoadingBtn(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoadingBtn(false);
      navigation('/');
    } catch (error) {
      setLoadingBtn(false);
      alert('다시 입력해주세요');
    }
  };

  const handlePassword = () => {
    const email = prompt('가입된 email을 입력해주세요');

    if (!email) {
      return alert('이메일을 입력해주세요');
    }
    sendPasswordResetEmail(auth, email)
      .then(a => {
        alert('가입된 이메일의 메일함을 확인해 주세요!');
      })
      .catch(err => {
        alert('등록되지 않은 이메일입니다.');
      });
  };

  return (
    <>
      <Navigation />
      <LogDiv>
        <LogLeft></LogLeft>
        <LogRight>
          <h2>Log In</h2>
          <LogForm onSubmit={handleSignIn}>
            <input id="email" type="email" required placeholder="email" />
            <input id="password" type="password" required placeholder="password" />

            <button type="submit">{loadingBtn ? 'Waiting...' : 'Log In'} </button>
            <p onClick={handlePassword}>Forgot Password? </p>
          </LogForm>
        </LogRight>
      </LogDiv>
    </>
  );
};

const LogDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;

  & > div {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  & > div:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const LogLeft = styled.div`
  width: 50vw;
  background-image: url('https://github.com/nbc-react-1/nbc-maeily/assets/133937368/fec3dd67-8da7-45a6-8811-e653974c02d4');
  background-color: #f4f5f9;
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;

  /* &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: linear-gradient(to right, black, transparent);
    background-color: aliceblue;
  } */
`;

const LogRight = styled.div`
  background-color: white;
  width: 55vw;
  padding: 100px 30px;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  & > h2 {
    font-weight: 900;
    font-size: 23px;
  }
`;

const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  gap: 15px;
  position: relative;

  input {
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    outline: none;
  }

  input:active {
    outline: none;
  }

  input:nth-child(2) {
    margin-bottom: 30px;
  }
  p {
    font-size: 13px;
    color: gray;
    cursor: pointer;
  }
  button {
    padding: 10px 15px;
    border: none;
    background-color: #121212;
    color: white;
    font-weight: 700;
    border-radius: 10px;
    width: 300px;
  }

  button:hover {
    transform: scale(1.03);
  }
`;

export default Login;
