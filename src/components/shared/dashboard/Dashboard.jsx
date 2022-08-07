import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { getWalletBalance } from '../../../helpers/getWalletBalance'
import { STWrapper } from '../generics/styled/styled'
import { Table } from 'antd'
import { Loader } from '../generics/icons/Loader'
import { Message } from '../generics/message/Message'
import { SortingForm } from './sorting-form/SortingForm'
import { SearchForm } from './search-form/SearchForm'

export function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [sortValue, setSortValue] = useState('timestamp')
  const [loading, setLoading] = useState(false)

  const inputValue = 'address'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userAddress = e.target[inputValue].value.trim()
    if (!userAddress) return

    setLoading(true)
    setTableData(null)
    setTableColumns(null)
    try {
      let finalColumns = []
      let finalData = []

      const response = await getWalletBalance(
        userAddress,
        process.env.NEXT_PUBLIC_API_KEY
      )

      if (!response.data) throw response

      finalData = response.data.items.map((el) => {
        const { block_height, block_signed_at, gas_price, tx_hash } = el

        return {
          timestamp: Date.parse(block_signed_at),
          block_height,
          gas_price,
          tx_hash,
          key: uuid(),
        }
      })

      finalColumns = Object.keys(finalData[0]).map((key) => {
        return {
          title: key.toUpperCase(),
          dataIndex: key,
          key: key,
        }
      })

      setRequestError(null)
      setTableData(finalData)
      setTableColumns(finalColumns)
    } catch (err) {
      setRequestError(err)
      setTableData(null)
      setTableColumns(null)
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
        {loading ? (
          <Loader color="#a3f" />
        ) : requestError ? (
          <Message color="#fff" bgColor="#a3f">
            Error {requestError.code}: {requestError.message}. Please try again.
          </Message>
        ) : tableData ? (
          <Table
            className="antd-table"
            dataSource={tableData}
            columns={tableColumns}
          />
        ) : (
          <Message color="#fff" bgColor="#a3f">
            Enter your address...
          </Message>
        )}
      </section>

      <section>
        <SearchForm
          inputName={inputValue}
          message="Enter your address"
          handleSubmit={handleSubmit}
        />
      </section>

      <section>
        <SortingForm handleOnChange={handleOnChange} handleSort={handleSort} />
      </section>
    </STWrapper>
  )
}
