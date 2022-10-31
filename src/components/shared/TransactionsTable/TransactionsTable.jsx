import React from 'react'
import Table from '@mui/material/TableContainer'
import { Loader } from '../Loader'
import { TransactionsTableBody } from './components/TransactionsTableBody'
import { TransactionsTableHead } from './components/TransactionsTableHead'

export function TransactionsTable({
  headers = [],
  rows = [],
  onRowClick,
  loading = false,
}) {
  console.log({ rows })

  return (
    <div
      style={{
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'auto',
        maxHeight: '600px',
        margin: 'auto',
      }}
    >
      {loading ? (
        <Loader color="#fff" />
      ) : (
        <Table component="table">
          <TransactionsTableHead headers={headers} />

          <TransactionsTableBody
            rows={rows}
            headers={headers}
            onRowClick={onRowClick}
          />
        </Table>
      )}
    </div>
  )
}
