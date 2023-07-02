import React from 'react';
import { styled } from 'styled-components';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

export default Layout;

const Container = styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 0px;
  @media only screen and (max-width: 1200px) {
    padding: 80px 10px;
  }
`;
