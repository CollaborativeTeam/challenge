import { Table } from 'antd'
import { SearchForm } from 'components/shared/SearchForm'
import { STTitle, STWrapper } from 'components/shared/styled'
import { useAddressContext } from 'context/AddressContext'
import getSortingFunction from 'helpers/getSortingFunction'
import { isEmpty } from 'helpers/isEmpty'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAddressTransactions } from 'services/getAddressTransactions'
import { v4 as uuid } from 'uuid'

const ADDRESS_INPUT_NAME = 'address'
const INITIAL_PARAMS = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  'no-logs': true,
  'page-size': 10,
  'page-number': 0,
}

export default function Dashboard() {
  const [tableData, setTableData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
    page_number: 0,
  })

  const router = useRouter()

  const { setTransactionData, addressData, setAddressData } =
    useAddressContext()

  useEffect(() => {
    setAddressData({
      userAddress,
      pagination,
      transactionsData: tableData,
      transactionsColumns: tableColumns,
    })
  }, [tableData, tableColumns, userAddress, pagination])

  useEffect(() => {
    if (!isEmpty(addressData)) {
      const { transactionsData, transactionsColumns, userAddress, pagination } =
        addressData

      setTableData(transactionsData)
      setUserAddress(userAddress)
      setTableColumns(transactionsColumns)
      setPagination(pagination)
    }
  }, [])

  const getAddressData = async (address = userAddress, params) => {
    setLoading(true)
    try {
      const { data: requestData } = await getAddressTransactions(address, {
        params: { ...INITIAL_PARAMS, ...params },
      })

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

      setRequestError(null)
      setTableData(tableData)
      setTableColumns(tableColumns)
      setPagination({ prev: page_number > 0, next: has_more, page_number })
    } catch (err) {
      setRequestError(err)
      setTableData(null)
      setTableColumns(null)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = (e) => {
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
          handleSubmit={handleFormSubmit}
        />
      </section>
      <section>
        {requestError && (
          <STTitle color="#fff" bgColor="#a3f">
            Error {requestError.code}: {requestError.message}. Please try again.
          </STTitle>
        )}

        {userAddress && <STTitle>Address: {userAddress}</STTitle>}

        <Table
          dataSource={tableData}
          columns={tableColumns}
          loading={loading}
          pagination={{ hideOnSinglePage: true }}
          sticky
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

      <nav>
        <button
          disabled={!pagination.prev}
          onClick={() =>
            getAddressData(userAddress, {
              'page-number': pagination.page_number - 1,
            })
          }
        >
          Previous
        </button>
        <button
          disabled={!pagination.next}
          onClick={() =>
            getAddressData(userAddress, {
              'page-number': pagination.page_number + 1,
            })
          }
        >
          Next
        </button>
      </nav>
    </STWrapper>
  )
}
