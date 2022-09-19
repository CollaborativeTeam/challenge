import { useContext, createContext, useState, useMemo } from 'react'

const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState({})

  return (
    <TransactionContext.Provider
      value={{ transactionData, setTransactionData }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  if (!context) throw new Error('Transaction context is not defined here!!')

  return context
}
