import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'

import PaginationBar from 'components/pages/Dasboard/components/PaginationBar'
// import { Table } from 'antd'
import { SearchForm } from 'components/shared/SearchForm'
import { STTitle } from 'components/shared/styled'
import { TransactionsTable } from 'components/TransactionsTable'
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
  const [tableRows, setTableRows] = useState(null)
  const [tableHeaders, setTableHeaders] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
    page_number: null,
  })

  const router = useRouter()

  const { setTransactionData, addressData, setAddressData } =
    useAddressContext()

  useEffect(() => {
    setAddressData({
      userAddress,
      pagination,
      transactionsData: tableRows,
      transactionsColumns: tableHeaders,
    })
  }, [tableRows, tableHeaders, userAddress, pagination])

  useEffect(() => {
    if (!isEmpty(addressData)) {
      const { transactionsData, transactionsColumns, userAddress, pagination } =
        addressData

      setTableRows(transactionsData)
      setUserAddress(userAddress)
      setTableHeaders(transactionsColumns)
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

      const tableRows = items.map((el) => {
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

      const tableHeaders = Object.keys(tableRows[0]).map((key) => {
        if (key === 'unusedKeys') return {}

        return {
          title: key.toUpperCase().replace('_', ' '),
          dataIndex: key,
          key: key,
          sorter: getSortingFunction(key, tableRows[0][key]),
        }
      })

      setRequestError(null)
      setTableRows(tableRows)
      setTableHeaders(tableHeaders)
      setPagination({ prev: page_number > 0, next: has_more, page_number })
    } catch (err) {
      setRequestError(err)
      setTableRows(null)
      setTableHeaders(null)
    } finally {
      console.log({ tableData: tableRows, tableColumns: tableHeaders })
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
    <Container maxWidth="lg" style={{ textAlign: 'center' }}>
      <SearchForm
        inputName={ADDRESS_INPUT_NAME}
        message="Enter your address"
        handleSubmit={handleFormSubmit}
      />
      {requestError && (
        <Typography component="span">
          Error {requestError.code}: {requestError.message}. Please try again.
        </Typography>
      )}
      {userAddress && <STTitle>Address: {userAddress}</STTitle>}
      {/* <Table
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
        /> */}
      {tableHeaders && tableRows ? (
        <TransactionsTable
          headers={tableHeaders}
          rows={tableRows}
          onRowClick={(row) => {
            setTransactionData(row)
            router.push(`transaction/${row.tx_hash}`)
          }}
        />
      ) : null}

      <br />
      <br />

      {pagination.page_number !== null ? (
        <PaginationBar
          nextPage={pagination.next}
          previousPage={pagination.prev}
          onPrevious={() =>
            getAddressData(userAddress, {
              'page-number': pagination.page_number - 1,
            })
          }
          onNext={() =>
            getAddressData(userAddress, {
              'page-number': pagination.page_number + 1,
            })
          }
        />
      ) : null}
    </Container>
  )
}
