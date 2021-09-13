import styled from "styled-components"

const FooterStyles = styled.footer`
  text-align:center;
  /* border-top: 2px solid grey; */
`

const Footer = () => (
  <FooterStyles>
    <p>view more at <a href="https://www.nbcsportsedge.com/edge/football/nfl/player-news/headlines">NBC Sports Edge</a></p>
  </FooterStyles>
)

export default Footer