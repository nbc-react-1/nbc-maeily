import React from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
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
    background-color: antiquewhite;
    width: 45vw;
  }
  & > div:nth-child(2) {
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
    & > form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 80px;
      gap: 15px;
      position: relative;
    }

    & > form > input {
      width: 280px;
      height: 30px;
      padding: 5px;
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
    }
    & > form > button {
      padding: 10px 15px;
      border: none;
      background-color: black;
      color: white;
      font-weight: 700;
      border-radius: 10px;
      width: 280px;
    }
  }
`;

const Login = () => {
  const navigation = useNavigate();
  const handleSignIn = async e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassword = () => {
    console.log('sdfsf');
    const email = prompt('dmail');
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
        <div>
         
        </div>
        <div>
          <h2>Sign up</h2>
          <form onSubmit={handleSignIn}>
            <input id="email" type="email" required placeholder="email" />
            <input id="password" type="password" required placeholder="password" />

            <p onClick={handlePassword}>비밀번호 찾기</p>
            <button type="submit">sign up</button>
            <p>Do you have an account?</p>
          </form>
        </div>
      </LogDiv>
    </>
  );
};

export default Login;
