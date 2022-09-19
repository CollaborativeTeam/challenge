import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { STWrapper } from 'components/shared/styled'
import { SearchForm } from 'components/dashboard/SearchForm'
import getSortingFunction from 'helpers/getSortingFunction'
import { Table } from 'antd'
import { Message } from 'components/shared/Message'
import { useTransactionContext } from 'context/TransactionContext'
import { useRouter } from 'next/router'

const inputValue = 'address'
const initialParams = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'no-logs': true,
  'page-size': 10,
}

let userAddress = null
let totalCount = null

export default function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { setTransactionData } = useTransactionContext()

  const getAddressData = async (address, params) => {
    setLoading(true)
    try {
      const { data: requestData } = await getAddressTransactions(address, {
        params: { ...initialParams, ...params },
      })

      const { items } = requestData.data

      if (requestData.error) {
        throw {
          code: requestData.error_code,
          message: requestData.error_message || 'There was an error',
        }
      }

      const tableData = items.map((el) => {
        const { block_height, block_signed_at, gas_price, tx_hash } = el

        return {
          creation_date: new Date(block_signed_at).toLocaleString(),
          block_height,
          gas_price,
          tx_hash,
          key: uuid(),
          unusedKeys: el,
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

      totalCount = 100
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
    const address = e.target[inputValue].value.trim()
    if (!address) return
    userAddress = address
    getAddressData(address)
  }

  return (
    <STWrapper>
      <section>
        <SearchForm
          inputName={inputValue}
          message="Enter your address"
          handleSubmit={handleSubmit}
        />
      </section>
      <section>
        {requestError && (
          <Message color="#fff" bgColor="#a3f">
            Error {requestError.code}: {requestError.message}. Please try again.
          </Message>
        )}

        <Table
          dataSource={tableData}
          columns={tableColumns}
          loading={loading}
          sticky
          pagination={{
            total: totalCount,
            onChange(page, pageSize) {
              getAddressData(userAddress, {
                'page-number': page,
                'page-size': pageSize,
              })
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setTransactionData(record)
                router.push('transaction')
              },
            }
          }}
        />
      </section>
    </STWrapper>
  )
}
