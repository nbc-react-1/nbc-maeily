import {styled} from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
   background-color: #fff;
  padding: 40px 60px 40px 50px;
  width: 400px;
  height: 50%;
  border-radius: 12px;
`;

const Modal = ({ children }) => {
  return (
    <ModalOverlay>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
