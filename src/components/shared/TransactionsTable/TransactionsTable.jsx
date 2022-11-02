import Table from '@mui/material/TableContainer'
import { TransactionsTableBody } from './components/TransactionsTableBody'
import { TransactionsTableHead } from './components/TransactionsTableHead'

export function TransactionsTable({ transactions = [], onRowClick }) {
  const headers = transactions[0] ? Object.keys(transactions[0]) : []

  console.log({ transactions })
  // console.log({ transactions[n].tx_hash })

  const transactionHashes = transactions.map(
    (transaction) => transaction.tx_hash
  )

  const transactionFields = transactions.map((transaction) =>
    Object.values(transaction).filter(
      (value) => typeof value !== 'boolean' && typeof value !== 'object'
    )
  )

  return (
    <div
      style={{
        overflowY: 'auto',
        overflowX: 'auto',
        maxHeight: '600px',
      }}
    >
      <Table component="table">
        <TransactionsTableHead headers={headers} />

        <TransactionsTableBody
          transactionFields={transactionFields}
          onRowClick={onRowClick}
          transactionHashes={transactionHashes}
        />
      </Table>
    </div>
  )
}
