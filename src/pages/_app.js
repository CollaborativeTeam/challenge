import 'antd/dist/antd.css'
import 'styles/index.css'
import { TransactionProvider } from 'context/TransactionContext'
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
    <TransactionProvider>
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
    </TransactionProvider>
  )
}

export default MyApp
