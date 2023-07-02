import React from 'react';
import { styled } from 'styled-components';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

export default Layout;

const Container = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 0;
`;
