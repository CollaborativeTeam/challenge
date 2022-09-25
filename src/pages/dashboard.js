import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { STTitle, STWrapper } from 'components/shared/styled'
import { SearchForm } from 'components/dashboard/SearchForm'
import getSortingFunction from 'helpers/getSortingFunction'
import { Table } from 'antd'
import { Message } from 'components/shared/Message'
import { useAddressContext } from 'context/AddressContext'
import { useRouter } from 'next/router'
import { isEmpty } from 'helpers/isEmpty'

const ADDRESS_INPUT_NAME = 'address'
const INITIAL_PARAMS = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'no-logs': true,
  'page-size': 10,
}

let totalCount = null

export default function Dashboard({}) {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userAddress, setUserAddress] = useState('')

  const router = useRouter()

  const { setTransactionData, addressData, setAddressData } =
    useAddressContext()

  useEffect(() => {
    setAddressData({
      userAddress,
      transactionsData: tableData,
      transactionsColumns: tableColumns,
    })
  }, [tableData, tableColumns, userAddress])

  useEffect(() => {
    if (!isEmpty(addressData)) {
      const { transactionsData, transactionsColumns, userAddress } = addressData

      setTableData(transactionsData)
      setUserAddress(userAddress)
      setTableColumns(transactionsColumns)
    }
  }, [])

  const getAddressData = async (address, params) => {
    setLoading(true)
    try {
      const { data: requestData } = await getAddressTransactions(address, {
        params: { ...INITIAL_PARAMS, ...params },
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
    const formAddress = e.target[ADDRESS_INPUT_NAME].value.trim()
    if (!formAddress) return
    getAddressData(formAddress)
    setUserAddress(formAddress)
  }

  return (
    <STWrapper>
      <section>
        <SearchForm
          inputName={ADDRESS_INPUT_NAME}
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

        {userAddress && <STTitle>Address: {userAddress}</STTitle>}

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
                router.push(`transaction/${record.tx_hash}`)
              },
            }
          }}
        />
      </section>
    </STWrapper>
  )
}
