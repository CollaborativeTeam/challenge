import { v4 as uuid } from 'uuid'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

export function TransactionsTableBody({ rows, headers, onRowClick }) {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={uuid()}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {onRowClick ? (
            <TableCell>
              <Button onClick={() => onRowClick(row)}>View details</Button>
            </TableCell>
          ) : null}

          {headers.map((header) => (
            <TableCell scope="row" key={uuid()}>
              {typeof row[header.key] !== 'object' ? row[header.key] : null}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
