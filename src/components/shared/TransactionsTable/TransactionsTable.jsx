import Table from '@mui/material/TableContainer'
import { Loader } from 'components/shared/Loader'
import { isEmpty } from 'helpers/isEmpty'
import { TransactionsTableBody } from './components/TransactionsTableBody'
import { TransactionsTableHead } from './components/TransactionsTableHead'

export function TransactionsTable({ transactions = [], onRowClick, loading }) {
  const headers = transactions[0] ? Object.keys(transactions[0]) : []

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
      {loading ? (
        <div
          style={{
            margin: 'auto',
            width: '100px',
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Loader color="#90CAF9" />
        </div>
      ) : (
        <Table component="table">
          {isEmpty(transactions) ? null : (
            <>
              <TransactionsTableHead headers={headers} />

              <TransactionsTableBody
                transactionFields={transactionFields}
                onRowClick={onRowClick}
                transactionHashes={transactionHashes}
              />
            </>
          )}
        </Table>
      )}
    </div>
  )
}
