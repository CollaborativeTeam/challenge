import Typography from '@mui/material/Typography'
import PaginationBar from 'components/pages/Home/components/PaginationBar'
import { Loader } from 'components/shared/Loader'
import { SearchForm } from 'components/shared/SearchForm'
import { TransactionsTable } from 'components/shared/TransactionsTable/TransactionsTable'
import { useTransactionsContext } from 'context/TransactionsContext'
import { isEmpty } from 'helpers/isEmpty'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { v4 as uuid } from 'uuid'

export default function Home() {
  const router = useRouter()

  const {
    transactions,
    loading,
    requestError,
    pagination,
    handleTransactionsRequest,
    setTransactionHash,
  } = useTransactionsContext()

  // useEffect(() => {
  //   setAddressData({
  //     userAddress,
  //     pagination,
  //     transactionsData: tableRows,
  //     transactionsColumns: tableHeaders,
  //   })
  // }, [tableRows, tableHeaders, userAddress, pagination])

  // useEffect(() => {
  //   if (!isEmpty(addressData)) {
  //     const { transactionsData, transactionsColumns, userAddress, pagination } =
  //       addressData

  //     setTableRows(transactionsData)
  //     setUserAddress(userAddress)
  //     setTableHeaders(transactionsColumns)
  //     setPagination(pagination)
  //   }
  // }, [])

  console.log([transactions])
  return (
    <>
      {requestError && (
        <Typography component="span">
          Error {requestError.code}: {requestError.message}. Please try again.
        </Typography>
      )}

      {loading ? null : (
        <TransactionsTable
          transactions={transactions}
          onRowClick={(transactionHash) => {
            router.push(`transaction/${transactionHash}`)
            setTransactionHash(transactionHash)
          }}
        />
      )}

      {pagination.page_number !== null ? (
        <PaginationBar
          nextPage={pagination.next}
          previousPage={pagination.prev}
          onPrevious={() =>
            handleTransactionsRequest(null, {
              'page-number': pagination.page_number - 1,
            })
          }
          onNext={() =>
            handleTransactionsRequest(null, {
              'page-number': pagination.page_number + 1,
            })
          }
        />
      ) : null}
    </>
  )
}
