import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <h1>MaelyLook</h1>
      <p>내일배움캠프 React 6</p>
      <p> &copy; 2023 NBC Ilhajo All rights reserved</p>
      <TeamLink>
        <a href="https://github.com/nbc-react-1/nbc-maeily">Github</a> | <a href="https://www.notion.so/e3a78f53ae0d429b87826e89358c58dd">Notion</a> |{' '}
        <a href="https://www.figma.com/file/fPo4E0J0vL3C9SQVRupEnW/Untitled?type=design&node-id=21-53&mode=design&t=ov90VfG1Yl1ez8Ho-0">Figma</a>
      </TeamLink>

      {/* <FooterSpan>
        <span className="svgIcon">
          <a href="https://github.com/nbc-react-1/nbc-maeily">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
        </span>
        <span className="svgIcon">
          <a href="https://www.notion.so/e3a78f53ae0d429b87826e89358c58dd">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" height="1em" viewBox="0 0 30 30">
              <path
                d="M5.6,5.2c0.9,0.8,1.3,0.7,3,0.6l16.5-1
	c0.4,0,0.1-0.3-0.1-0.4l-2.7-2c-0.5-0.4-1.2-0.9-2.6-0.8l-16,1.2C3.2,2.9,3.1,3.2,3.3,3.4L5.6,5.2z M6.6,9.1v17.4
	c0,0.9,0.5,1.3,1.5,1.2l18.2-1.1c1.1-0.1,1.2-0.7,1.2-1.5V7.9c0-0.8-0.3-1.2-0.9-1.1l-19,1.1C6.8,8,6.6,8.3,6.6,9.1L6.6,9.1z
	 M24.5,10c0.1,0.5,0,1.1-0.5,1.1l-0.9,0.2v12.8c-0.8,0.4-1.5,0.6-2,0.6c-0.9,0-1.2-0.3-1.9-1.2l-5.7-9v8.7l1.8,0.4c0,0,0,1-1.5,1
	l-4,0.2c-0.1-0.2,0-0.8,0.4-0.9l1.1-0.3V12.3l-1.5-0.1c-0.1-0.5,0.2-1.3,1-1.3l4.3-0.3l6,9.1v-8l-1.5-0.2c-0.1-0.6,0.3-1.1,0.9-1.2
	L24.5,10z M2.5,1.3L19.1,0c2-0.2,2.6-0.1,3.9,0.9l5.3,3.7c0.9,0.6,1.2,0.8,1.2,1.5v20.5c0,1.3-0.5,2-2.1,2.2L8,29.9
	C6.8,30,6.2,29.8,5.5,29l-3.9-5.1c-0.7-0.9-1-1.6-1-2.5V3.3C0.6,2.2,1.1,1.4,2.5,1.3z"
              />
            </svg>
          </a>
        </span>
      </FooterSpan> */}
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

const FooterContainer = styled.div`
  width: 100vw;
  color: white;
  background-color: #121212;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    font-weight: 600;
    font-size: 25px;
    margin: 30px;
  }

  & > p {
    font-size: 0.8rem;
    color: #8f8f8f;
    font-weight: 500;
    margin: 3px;
  }
`;

const FooterSpan = styled.span`
  margin-top: 20px;
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
    svg {
      fill: #fff;
      &:hover {
        fill: #000;
      }
    }
  }
  & > span.svgIcon {
    padding: 6px;
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
