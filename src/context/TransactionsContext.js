import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { getTransactionData } from 'services/getTransactionData'

const TransactionsContext = createContext()

const INITIAL_PARAMS = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'no-logs': true,
  'page-size': 10,
  'page-number': 0,
}

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [transaction, setTransaction] = useState([])
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
    page_number: null,
  })

  const router = useRouter()

  useEffect(() => {
    setTransaction(
      transactions.find(
        (transaction) => transaction.tx_hash === transactionHash
      ) ?? {}
    )
  }, [transactionHash])

  const handleTransactionsRequest = async (address, params) => {
    setLoading(true)
    try {
      const { data: requestData } = await getAddressTransactions(
        address || userAddress,
        {
          params: { ...INITIAL_PARAMS, ...params },
        }
      )

      if (requestData.error) {
        throw {
          code: requestData.error_code,
          message: requestData.error_message || 'There was an error',
        }
      }

      const {
        items,
        pagination: { has_more, page_number },
      } = requestData.data

      setRequestError(null)
      setTransactions(items)
      setPagination({ prev: page_number > 0, next: has_more, page_number })
    } catch (err) {
      setRequestError(err)
      setTransactions([])
    } finally {
      setLoading(false)

      if (!/^\/$/.test(router.pathname)) {
        router.push('/')
      }
    }
  }

  const handleTransactionRequest = async (txHash) => {
    setLoading(true)
    try {
      const { data: requestData } = await getTransactionData(txHash)

      if (requestData.error) {
        throw {
          code: requestData.error_code,
          message: requestData.error_message || 'There was an error',
        }
      }

      setRequestError(null)
      setTransaction(requestData.data.items[0])
    } catch (err) {
      setRequestError(err)
      setTransaction({})
    } finally {
      setLoading(false)
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        loading,
        setLoading,
        requestError,
        setRequestError,
        pagination,
        setPagination,
        userAddress,
        setUserAddress,
        transactionHash,
        setTransactionHash,
        transaction,
        setTransaction,
        handleTransactionsRequest,
        handleTransactionRequest,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)

  if (!context) throw new Error('Transactions context is not defined here!!')

  return context
}
