import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
:root {
  --default: #3c4043;
  --litegrey: #F7F7F7;
  --grey: #ececec;
}
html, body, #next {
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  color: var(--default);
  background-color: var(--litegrey);
  h2, h3 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  } 
  h2 {
    font-weight: 600;
    font-size: 20px;
  }
  h3 {
    font-weight: 550;
    font-size: 16px;
  }
  @media (max-width:450px){
    font-size: 15px;
    h2 {
      font-size: 16px;
    }
    h3 {
      font-size: 13px;
    }
    .attention {
      margin: 0 auto;
      padding-top: 150px;
      text-align:center;
      font-size: 16;
      font-weight: bold;
    }
  } 
}
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
