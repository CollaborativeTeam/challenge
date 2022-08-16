import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { getWalletBalance } from '../../../helpers/getWalletBalance'
import { STWrapper } from '../generics/styled/styled'
import { SortingForm } from './sorting-form/SortingForm'
import { SearchForm } from './search-form/SearchForm'
import { TableWrapper } from './table-wrapper/TableWrapper'

export function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [sortValue, setSortValue] = useState('timestamp')
  const [loading, setLoading] = useState(false)
  const [sortingValues, setSortingValues] = useState([])

  const inputValue = 'address'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userAddress = e.target[inputValue].value.trim()
    if (!userAddress) return

    setLoading(true)
    setTableData(null)
    setTableColumns(null)
    try {
      const finalSortingValues = []

      const response = await getWalletBalance(
        userAddress,
        process.env.NEXT_PUBLIC_API_KEY
      )
      if (!response.data) throw response

      const finalData = response.data.items.map((el) => {
        const { block_height, block_signed_at, gas_price, tx_hash } = el

        return {
          timestamp: Date.parse(block_signed_at),
          block_height,
          gas_price,
          tx_hash,
          key: uuid(),
        }
      })

      const finalColumns = Object.keys(finalData[0]).map((key, index, arr) => {
        typeof finalData[0][key] === 'number'
          ? finalSortingValues.push(key)
          : null

        return {
          title: key.toUpperCase().replace('_', ' '),
          dataIndex: key,
          key: key,
        }
      })

      setRequestError(null)
      setSortingValues(finalSortingValues)
      setTableData(finalData)
      setTableColumns(finalColumns)
    } catch (err) {
      console.log({ err })
      if (err.response?.status === 400)
        err.message = 'This address does not exists'

      setRequestError(err)
      setTableData(null)
      setTableColumns(null)
      setSortingValues([])
    }

    setLoading(false)
  }

  // task: implement toggle-bar component
  // to change the sorting order (btw ascending to descending)

  const handleSort = () => {
    const sortedData = [...tableData].sort(
      (a, b) => b[sortValue] - a[sortValue]
    )
    setTableData(sortedData)
  }

  const handleOnChange = (e) => {
    setSortValue(e.target.value)
  }

  return (
    <STWrapper>
      <section>
        <TableWrapper
          loading={loading}
          requestError={requestError}
          tableColumns={tableColumns}
          tableData={tableData}
        />
      </section>

      <section>
        <SearchForm
          inputName={inputValue}
          message="Enter your address"
          handleSubmit={handleSubmit}
        />
      </section>

      <section>
        <SortingForm
          sortingValues={sortingValues}
          handleOnChange={handleOnChange}
          handleSort={handleSort}
        />
      </section>
    </STWrapper>
  )
}
