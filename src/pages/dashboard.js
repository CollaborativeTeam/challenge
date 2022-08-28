import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { getWalletBalance } from 'services/getWalletBalance'
import { STWrapper } from 'components/shared/styled'
import { SearchForm } from 'components/dashboard/SearchForm'
import { TableWrapper } from 'components/dashboard/TableWrapper'
import getSortingFunction from 'helpers/getSortingFunction'

const inputValue = 'address'
const params = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'page-size': 6,
}

export default function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getAddressData = async (address) => {
    setLoading(true)
    setTableData(null)
    setTableColumns(null)

    try {
      const { data: requestData } = await getWalletBalance(address, { params })

      if (requestData.error) {
        const { error_code, error_message } = response.data

        throw {
          code: error_code,
          message: error_message || 'There was an error',
        }
      }

      const tableData = requestData.data.items.map((el) => {
        const { block_height, block_signed_at, gas_price, tx_hash } = el

        return {
          // timestamp: Date.parse(block_signed_at),
          creation_date: new Date(block_signed_at).toLocaleString(),
          block_height,
          gas_price,
          tx_hash,
          key: uuid(),
        }
      })

      const tableColumns = Object.keys(tableData[0]).map((key) => {
        return {
          title: key.toUpperCase().replace('_', ' '),
          dataIndex: key,
          key: key,
          sorter: getSortingFunction(key, tableData[0][key]),
        }
      })

      setRequestError(null)
      setTableData(tableData)
      setTableColumns(tableColumns)
    } catch (err) {
      setRequestError(err)
      setTableData(null)
      setTableColumns(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userAddress = e.target[inputValue].value.trim()
    if (!userAddress) return
    getAddressData(userAddress)
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
    </STWrapper>
  )
}
