import styled from "styled-components"

const FooterStyles = styled.footer`
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  color: #3c4043;
  text-align:center;
  /* border-top: 2px solid grey; */
`

const Footer = () => (
  <FooterStyles>
    <p>view more at <a href="https://www.nbcsportsedge.com/edge/football/nfl/player-news/headlines">NBC Sports Edge</a></p>
  </FooterStyles>
)

export default Footer