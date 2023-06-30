import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

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

  & > div:nth-child(1) {
    width: 45vw;
    background-image: url('https://img.shopcider.com/hermes/posting/tiny-image-1686040660000-azbrwx.jpeg?x-oss-process=image/resize,w_1400,m_lfit/quality,Q_80/interlace,1');
    height: 100vh;
    background-position: center;
    background-size: cover;
  }
  & > div:nth-child(2) {
    background-color: white;
    width: 60vw;
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
    & > form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 70px;
      gap: 15px;
      position: relative;
    }

    & > form > input {
      width: 300px;
      height: 40px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid black;
      outline: none;
    }

    & > form > input:active {
      outline: none;
    }

    & > form > input:nth-child(2) {
      margin-bottom: 30px;
    }
    & > form > p {
      font-size: 13px;
      color: gray;
      cursor: pointer;
    }
    & > form > button {
      padding: 10px 15px;
      border: none;
      background-color: #121212;
      color: white;
      font-weight: 700;
      border-radius: 10px;
      width: 300px;
    }
  }
`;

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { sucessUserInfo, isUserTrue } = useSelector(state => state.userLogIn);
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
    const email = prompt('email');
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
        <div></div>
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleSignIn}>
            <input id="email" type="email" required placeholder="email" />
            <input id="password" type="password" required placeholder="password" />

            <p onClick={handlePassword}>비밀번호 찾기</p>
            <button type="submit">{loadingBtn ? 'Waiting...' : 'Log In'} </button>
            <p>Do you have an account?</p>
          </form>
        </div>
      </LogDiv>
    </>
  );
};

export default Login;
