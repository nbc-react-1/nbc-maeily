import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    button {
        border: 0;
        cursor: pointer;
        transition: all 0.4s;
    }
    input::placeholder {
        color:#ccc;
        }
`;

export default GlobalStyle;
