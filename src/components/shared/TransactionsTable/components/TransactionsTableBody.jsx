import { v4 as uuid } from 'uuid'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

export function TransactionsTableBody({
  transactionFields,
  onRowClick,
  transactionHashes,
}) {
  return (
    <TableBody>
      {transactionFields.map((transaction, index) => (
        <TableRow
          key={uuid()}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {onRowClick ? (
            <TableCell>
              <Button onClick={() => onRowClick(transactionHashes[index])}>
                View details
              </Button>
            </TableCell>
          ) : null}

          {transaction.map((field) => (
            <TableCell key={uuid()} scope="row">
              {field}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
