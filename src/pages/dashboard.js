import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { ToggleBar } from 'components/shared/ToggleBar'
import { getWalletBalance } from 'services/getWalletBalance'
import { STFlex, STWrapper } from 'components/shared/styled'
import { SearchForm } from 'components/dashboard/SearchForm'
import { TableWrapper } from 'components/dashboard/TableWrapper'

const inputValue = 'address'
const params = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'page-size': 6,
}

export default function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [ascendingSort, setAscendingSort] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lastAddress, setLastAddress] = useState(null)

  useEffect(() => {
    if (!lastAddress) return

    params['block-signed-at-asc'] = ascendingSort
    getAddressData(lastAddress)
  }, [ascendingSort])

  const getAddressData = async (address) => {
    setLoading(true)
    setTableData(null)
    setTableColumns(null)
    try {
      const response = await getWalletBalance(address, params)

      if (!response.data) throw response

      const data = response.data.items.map((el) => {
        const { block_height, block_signed_at, gas_price, tx_hash } = el

        return {
          timestamp: Date.parse(block_signed_at),
          block_height,
          gas_price,
          tx_hash,
          key: uuid(),
        }
      })

      const columns = Object.keys(data[0]).map((key) => {
        // typeof data[0][key] === 'number' ? sortingValues.push(key) : null

        return {
          title: key.toUpperCase().replace('_', ' '),
          dataIndex: key,
          key: key,
        }
      })

      setRequestError(null)
      setTableData(data)
      setTableColumns(columns)
    } catch (err) {
      // 400 or 404?
      if (err.response?.status === 400)
        err.message = 'This address does not exists'

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
    setLastAddress(userAddress)
    getAddressData(userAddress)
  }

  // task: implement toggle-bar component
  // to change the sorting order (btw ascending to descending)

  const handleChecked = (e) => {
    setAscendingSort(e.target.checked)
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
      <STFlex justCont="center" alItems="center" flexDir="column">
        <p>Ascending order:</p>
        <ToggleBar checked={ascendingSort} handleChecked={handleChecked} />
      </STFlex>
    </STWrapper>
  )
}
