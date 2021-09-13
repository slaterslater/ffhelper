import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
body{
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  color: #3c4043;
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
