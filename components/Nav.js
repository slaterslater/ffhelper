import Link from 'next/link'
import styled from 'styled-components'

const NavStyles = styled.nav`
  ul {
    max-width: 1000px;
    padding: 10px 0;
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

const Nav = ({children}) => (
  <NavStyles>
    {/* <ul>
    <li><Link href="/">News Headlines</Link></li>
    <li><Link href="/rankings">Player Rankings</Link></li>
    </ul> */}
    {children}
  </NavStyles>
)

export default Nav