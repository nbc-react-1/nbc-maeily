import React from 'react';
import { styled } from 'styled-components';

export const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const StButton = styled.button`
  align-items: center;
  background-color: ${props => props.bgColor || '#000'};
  border: ${props => props.stBorder || 'none'};
  color: ${props => props.fontColor || 'white'};
  border-radius: 8px;
  padding: 12px 0;

  ${({ btnSize }) => {
    let btnHeight;
    let btnWidth;
    switch (btnSize) {
      case 'large':
        btnWidth = '200px';
        btnHeight = '50px';
        break;

      case 'small':
        btnWidth = '100px';
        btnHeight = '40px';
        break;

      default:
        btnWidth = '130px';
        btnHeight = '45px';
        break;
    }
    return `width : ${btnWidth};
                height : ${btnHeight}`;
  }};
  &:active {
    background-color: ${props => props.acColor || props.bgColor};
  }
`;

function Button() {
  return <div></div>;
}

export default Button;
