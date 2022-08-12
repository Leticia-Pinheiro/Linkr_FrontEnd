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

    .Modal {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 600px;
        height: 250px;
        background: #333333;
        border-radius: 50px;
        padding: 35px 130px;
    }

    .Overlay {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
    }

    .searchBar {
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border-radius: 8px;
        outline: 0;
        border: 0;
        font-family: 'Lato';
        font-size: 19px;
        color: black;
        padding: 5px;

        ::placeholder {
            font-family: 'Lato';
            font-size: 19px;
            color: #C6C6C6;
        }
    }

    
`;

export default GlobalStyle;
