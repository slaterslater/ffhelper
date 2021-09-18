import Link from 'next/link'
import styled from 'styled-components'

const NavStyles = styled.nav`
  ul {
    max-width: 1000px;
    padding: 0;
    margin: 0 auto;
    list-style-type: none;
    display:flex;
    justify-content: space-around;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--default);
    font-weight: bold;
  }
`

const Nav = () => (
  <NavStyles>
    <ul>
    <li><Link href="/"><a>News Headlines</a></Link></li>
    <li><Link href="/rankings"><a>Player Rankings</a></Link></li>
    </ul>
  </NavStyles>
)

export default Nav