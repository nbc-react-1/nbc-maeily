import React from 'react';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import Footer from '../components/Footer';

const Banner = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  return (
    <>
      <Navigation />
      <Banner>
        <div>
          <h1>Title banner here</h1>
        </div>
        <div>sdfsfds</div>
      </Banner>
      <h1>adasd</h1>
      <div style={{ height: 1000 }}></div>
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </>
  );
};
export default Home;
