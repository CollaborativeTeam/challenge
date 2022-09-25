import 'antd/dist/antd.css'
import 'styles/index.css'
import { TransactionProvider } from 'context/TransactionContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  )
}

export default MyApp
