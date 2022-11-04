import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Button from '@mui/material/Button'
import Link from 'next/link'

export function NavBar() {
  return (
    <Link href="/">
      <Button
        style={{
          display: 'flex',
          position: 'fixed',
          top: '6.5rem',
          left: '1rem',
          backgroundColor: '#0009',
        }}
        size="large"
        startIcon={<ChevronLeft />}
      >
        Back to dashboard
      </Button>
    </Link>
  )
}
