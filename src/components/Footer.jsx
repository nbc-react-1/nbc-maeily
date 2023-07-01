import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <a href="#">
          <img src="https://github.com/nbc-react-1/nbc-maeily/assets/126348461/4dbb97ce-8af9-4d22-a851-0b527105077a" alt="maeilylook-logo" />
        </a>
      </FooterLogo>
      <p>내일배움캠프 React 6</p>
      <p> &copy; 2023 NBC Ilhajo All rights reserved</p>
      <TeamLink>
        <a href="">Yujin</a> | <a href="">Sujung</a> | <a href="">Jinsu</a> | <a href="">Heejung</a>
      </TeamLink>

      <FooterSpan>
        <span className="svgIcon">
          <a href="https://github.com/nbc-react-1/nbc-maeily">
            <img src="https://github.com/nbc-react-1/nbc-maeily/assets/126348461/fd452924-3270-4189-84ea-f9e850705f37" alt="" />
          </a>
        </span>
        <span className="svgIcon">
          <a href="https://www.notion.so/e3a78f53ae0d429b87826e89358c58dd">
            <img src="https://github.com/nbc-react-1/nbc-maeily/assets/126348461/0245fe55-b46e-48a1-9cf0-31955a939ba6" alt="" />
          </a>
        </span>
        <span>
          <a href="https://www.figma.com/file/fPo4E0J0vL3C9SQVRupEnW/Untitled?type=design&node-id=21-53&mode=design&t=ov90VfG1Yl1ez8Ho-0">
            <img src="https://github.com/nbc-react-1/nbc-maeily/assets/126348461/3e5369fc-2cf1-4e88-8f26-fa04869e1908" alt="" />
          </a>
        </span>
      </FooterSpan>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100vw;
  color: white;
  background-color: #121212;
  padding: 60px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    font-size: 0.8rem;
    color: #8f8f8f;
    font-weight: 500;
    margin: 3px;
  }
`;
const FooterLogo = styled.h1`
  max-width: 150px;
  margin-bottom: 15px;
  a {
    img {
      width: 100%;
    }
  }
`;
const FooterSpan = styled.div`
  margin-top: 20px;
  & > span a {
    width: 30px;
    height: 30px;
    padding: 6px;
    display: inline-flex;
    border: 1px solid white;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    line-height: 1;
    margin: 10px;
  }
  & > span a::before {
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
  & > span:hover a::before {
    transform: scale(1);
  }

  & > span:hover img {
    filter: brightness(0) saturate(100%) invert(0%) sepia(7%) saturate(98%) hue-rotate(346deg) brightness(95%) contrast(86%);
  }
`;

const TeamLink = styled.div`
  margin-top: 15px;
  font-size: 0.8rem;
  color: #8f8f8f;
  a {
    text-decoration: none;
    color: inherit;
    :active {
      color: #fff;
    }
  }
`;
