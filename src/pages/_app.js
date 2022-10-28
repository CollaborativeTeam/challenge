import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import 'styles/index.css'

import { AddressProvider } from 'context/AddressContext'
import Link from 'next/link'
import styled from 'styled-components'

const STNav = styled.nav`
  display: flex;
  width: 100%;
  gap: 1rem;
  background-color: slateblue;
  justify-content: space-evenly;
  color: #fff;
  padding: 1rem;

  a {
    font-size: 1.4rem;
    color: #fff;
  }
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <AddressProvider>
      <header>
        <STNav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/static-table">
            <a>Static table</a>
          </Link>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </STNav>
      </header>
      <Component {...pageProps} />
    </AddressProvider>
  )
}

export default MyApp
