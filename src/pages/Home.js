import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

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
  const dispatch = useDispatch();
  const { sucessUserInfo, storeInfo, isUserTrue } = useSelector(state => state.userLogIn);

  const arr = async () => {
    const washingtonRef = doc(db, 'arr', 'sss');

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      aa: [{ sfsdfd: 'sfsf' }, { sfsdf: 'sfsfsdf' }],
    });
  };

  return (
    <>
      <Navigation />
      <Banner>
        <button onClick={arr}>arr</button>
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
