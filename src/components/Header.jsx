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
      style={{ flexDirection: 'row', alignItem: 'center', maxWidth: '100vw' }}
      position="static"
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Timeline />
        </IconButton>
      </Toolbar>
      <Typography
        style={{ height: 'fit-content' }}
        variant="h6"
        component="span"
        sx={{ flexGrow: 1, marginY: 'auto' }}
      >
        CRYPTO GRAPHICS
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="button" underline="hover" href="/">
          Home
        </Button>
        <Button variant="button" underline="hover" href="/static-table">
          Static table
        </Button>
        <Button variant="button" underline="hover" href="/dashboard">
          Dashboard
        </Button>
      </Stack>
    </AppBar>
  )
}
