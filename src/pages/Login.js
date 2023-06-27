import React from 'react';
import styled from 'styled-components';

const LogDiv = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 60px;
    border: 1px solid black;
  }

  & > div > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */
`;

const Login = () => {
  const handleSignIn = () => {};
  return (
    <LogDiv>
      <div>asdads</div>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSignIn}>
          <input type="email" required placeholder="email" />
          <input type="password" required placeholder="password" />

          <button type="submit">sign up</button>
          <p>Do tou have an account?</p>
        </form>
      </div>
    </LogDiv>
  );
};

export default Login;
