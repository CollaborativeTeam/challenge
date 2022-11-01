import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import { TransactionsTable } from 'components/shared/TransactionsTable/TransactionsTable'
import { STTitle } from 'components/shared/styled'
import { useAddressContext } from 'context/AddressContext'
import { isEmpty } from 'helpers/isEmpty'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getTransactionData } from 'services/getTransactionData'
import { v4 as uuid } from 'uuid'

export default function Transaction() {
  const [tableRows, setTableRows] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const { transactionData } = useAddressContext()

  const {
    query: { tx_hash },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (!isReady) return

    if (isEmpty(transactionData)) {
      handleTransactionDataReq()
      return
    }

    const { unusedKeys, ...restKeys } = transactionData
    const tableRows = [{ ...unusedKeys, ...restKeys }]

    setTableRows(tableRows)
    setTableHeaders(
      Object.keys(tableRows[0]).map((key) => ({
        title: key.toUpperCase().replace('_', ' '),
        dataIndex: key,
        key,
      }))
    )
  }, [isReady])

  const handleTransactionDataReq = async () => {
    setLoading(true)
    try {
      const { data: requestData } = await getTransactionData(tx_hash)

      if (requestData.error) {
        throw {
          code: requestData.error_code,
          message: requestData.error_message || 'There was an error',
        }
      }

      const tableData = [{ ...requestData.data.items[0], key: uuid() }]

      const tableColumns = Object.keys(tableData[0]).map((key) => {
        return {
          title: key.toUpperCase().replace('_', ' '),
          dataIndex: key,
          key,
        }
      })

      setTableRows(tableData)
      setTableHeaders(tableColumns)
      setRequestError(null)
    } catch (error) {
      console.log(error)

      setTableRows([{}])
      setTableHeaders([{}])
      setRequestError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg">
      <Link href="/">
        <Button size="large" startIcon={<ChevronLeft />}>
          Back to dashboard
        </Button>
      </Link>

      {tx_hash && (
        <TransactionsTable
          rows={tableRows}
          headers={tableHeaders}
          loading={loading}
        />
      )}
    </Container>
  )
}
