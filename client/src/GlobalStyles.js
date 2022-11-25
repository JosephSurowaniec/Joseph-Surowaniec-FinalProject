import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html, body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    margin: 0;
        padding: 0;
        border: 0;
        position: relative;
}

`

export default GlobalStyles;