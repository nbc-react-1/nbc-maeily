import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100vw;
  height: 300px;
  color: white;
  background-color: #121212;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterSpan = styled.span`
  & > span {
    width: 30px;
    height: 30px;
    padding: 8px;
    display: inline-flex;
    border: 1px solid white;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    line-height: 1;
    margin: 10px;
  }

  & > span::before {
    content: '';
    width: 15px;
    height: 15px;
    padding: 8px;
    position: absolute;
    top: -1px;
    left: -1px;
    border-radius: 50%;
    background-color: #ffffff;
    transform: scale(0);
    transition: 0.3s ease-in-out;
  }

  & > span:hover::before {
    transform: scale(1);
  }

  & > span:hover img {
    filter: brightness(0) saturate(100%) invert(0%) sepia(7%) saturate(98%) hue-rotate(346deg) brightness(95%) contrast(86%);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <h1>Footer</h1>
      <p>adasdadasdasadd</p>
      <p>adasdadasdasaasdaddd</p>
      <p>adasdadasdasadd</p>
      <FooterSpan>
        <span>
          <img src="https://raw.githubusercontent.com/judygab/web-dev-projects/6bf5a12767154a7383288450bb441d04f7c0dce9/personal-portfolio/src/assets/img/nav-icon1.svg" alt="footer" />
        </span>
        <span>
          <img src="https://raw.githubusercontent.com/judygab/web-dev-projects/6bf5a12767154a7383288450bb441d04f7c0dce9/personal-portfolio/src/assets/img/nav-icon2.svg" alt="footer" />
        </span>
        <span>
          <img src="https://raw.githubusercontent.com/judygab/web-dev-projects/6bf5a12767154a7383288450bb441d04f7c0dce9/personal-portfolio/src/assets/img/nav-icon3.svg" alt="footer" />
        </span>
      </FooterSpan>
    </FooterContainer>
  );
};

export default Footer;
