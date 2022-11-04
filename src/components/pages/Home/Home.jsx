import Typography from '@mui/material/Typography'
import PaginationBar from 'components/pages/Home/components/PaginationBar'
import { TransactionsTable } from 'components/shared/TransactionsTable/TransactionsTable'
import { useTransactionsContext } from 'context/TransactionsContext'
import { useRouter } from 'next/router'

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

  const mappedTransactions = transactions.map((transaction) => {
    const { block_height, block_signed_at, gas_price, tx_hash } = transaction

    return {
      creation_date: new Date(block_signed_at).toLocaleString(),
      block_height,
      gas_price,
      tx_hash,
    }
  })

  const handleOnNext = () => {
    handleTransactionsRequest(null, {
      'page-number': pagination.page_number + 1,
    })
  }

  const handleOnPrevious = () => {
    handleTransactionsRequest(null, {
      'page-number': pagination.page_number - 1,
    })
  }

  return (
    <>
      {requestError && (
        <Typography component="span">
          Error {requestError.code}: {requestError.message}. Please try again.
        </Typography>
      )}

      {loading ? null : (
        <TransactionsTable
          transactions={mappedTransactions}
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
          onPrevious={handleOnPrevious}
          onNext={handleOnNext}
        />
      ) : null}
    </>
  )
}
