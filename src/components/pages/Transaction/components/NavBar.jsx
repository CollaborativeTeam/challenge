import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Button from '@mui/material/Button'
import Link from 'next/link'

export function NavBar() {
  return (
    <Link style={{ margin: '2rem' }} href="/">
      <Button size="large" startIcon={<ChevronLeft />}>
        Back to dashboard
      </Button>
    </Link>
  )
}
