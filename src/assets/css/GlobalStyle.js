import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
    }

    body {
        background: #333333;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default GlobalStyle;
