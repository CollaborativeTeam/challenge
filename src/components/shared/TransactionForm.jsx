import { useTransactionsContext } from 'context/TransactionsContext'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { SearchForm } from './SearchForm'

const ADDRESS_INPUT_NAME = 'address'

export function TransactionForm() {
  const { loading, handleTransactionsRequest, setUserAddress } =
    useTransactionsContext()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formAddress = e.target[ADDRESS_INPUT_NAME].value.trim()
    if (!formAddress) return
    setUserAddress(formAddress)
    handleTransactionsRequest(formAddress)
  }

  return (
    <SearchForm
      inputName={ADDRESS_INPUT_NAME}
      message="Enter your address"
      handleSubmit={handleFormSubmit}
      loading={loading}
    />
  )
}
