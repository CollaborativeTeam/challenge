import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Header from 'components/Header'
import 'styles/index.css'

import { TransactionsProvider } from 'context/TransactionsContext'

import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({ palette: { mode: 'dark' } })

const MyApp = ({ Component, pageProps }) => {
  return (
    <TransactionsProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />

        <main style={{ paddingTop: '5rem' }}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </TransactionsProvider>
  )
}

export default MyApp
