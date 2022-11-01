import { Button } from '@mui/material'

export default function PaginationBar({
  previousPage,
  nextPage,
  onPrevious,
  onNext,
}) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        margin: '2rem auto',
      }}
    >
      <Button variant="contained" disabled={!previousPage} onClick={onPrevious}>
        Previous
      </Button>
      <Button variant="contained" disabled={!nextPage} onClick={onNext}>
        Next
      </Button>
    </nav>
  )
}
