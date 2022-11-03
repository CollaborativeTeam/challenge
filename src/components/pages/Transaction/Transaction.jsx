import { useTransactionsContext } from 'context/TransactionsContext'
import { isEmpty } from 'helpers/isEmpty'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TransactionCard } from 'components/pages/Transaction/components/TransactionCard'
import { NavBar } from './components/NavBar'

const TRANSACTION_DATA_PLACEHOLDER = {
  '***': '***',
  '---': '---',
  ___: '___',
}

export default function Transaction() {
  const { handleTransactionRequest, loading, transaction } =
    useTransactionsContext()

  const {
    query: { tx_hash },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (!isReady) return

    if (isEmpty(transaction)) {
      handleTransactionRequest(tx_hash)
      return
    }
  }, [isReady])

  return (
    <>
      <NavBar />

      <TransactionCard
        transaction={loading ? TRANSACTION_DATA_PLACEHOLDER : transaction}
      />
    </>
  )
}
