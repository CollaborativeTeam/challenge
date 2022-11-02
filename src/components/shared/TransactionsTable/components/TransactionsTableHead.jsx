import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import { v4 as uuid } from 'uuid'

export function TransactionsTableHead({ headers = [] }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>DETAILS</TableCell>

        {headers.map((header) => (
          <TableCell key={uuid()}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
