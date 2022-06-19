import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    body {
        margin: 0;
        box-sizing: border-box;
        min-width: 450px;
    }

    h1, h2, h3, p, span{
        margin: 0;
        padding: 10px
    }

    ul, ol{
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a{
        text-decoration: none;
        color: black;
    }

    button{
        margin : 2px;
    }

    input::placeholder{
        font-style: italic;
    }

    .title {
        background-color: beige;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }
`