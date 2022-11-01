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
        overflowY: 'auto',
        overflowX: 'auto',
        maxHeight: '600px',
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
