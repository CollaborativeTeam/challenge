import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Timeline from '@mui/icons-material/Timeline'

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
        padding: '0 1rem',
      }}
    >
      <div style={{ display: 'flex', flexGrow: 1 }}>
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
          CRYPTO ASSETS
        </Typography>
      </div>
      <Stack direction="row" spacing={2}>
        <Button variant="button" underline="hover" href="/">
          Home
        </Button>
        <Button variant="button" underline="hover" href="/dashboard">
          Dashboard
        </Button>
      </Stack>
    </AppBar>
  )
}
