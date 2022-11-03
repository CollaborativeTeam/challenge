import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Timeline from '@mui/icons-material/Timeline'
import Link from 'next/link'
import { TransactionForm } from './shared/TransactionForm'

export default function Header() {
  return (
    <AppBar
      style={{
        flexDirection: 'row',
        alignItem: 'center',
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
        maxWidth: '100vw',
        padding: '.7rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Timeline />
          </IconButton>
        </Toolbar>
        <Typography
          style={{ height: 'fit-content' }}
          component="span"
          sx={{ marginY: 'auto' }}
          className="header-title"
        >
          <Link href="/">
            <a>CRYPTO ASSETS</a>
          </Link>
        </Typography>
      </div>
      <Stack style={{ flexGrow: 1, justifyContent: 'end' }} direction="row">
        <TransactionForm />
      </Stack>
    </AppBar>
  )
}
