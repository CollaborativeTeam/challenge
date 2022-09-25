import { useEffect, useState } from 'react'
import { useTransactionContext } from 'context/TransactionContext'
import { useRouter } from 'next/router'
import { getTransactionData } from 'services/getTransactionData'
import { LeftOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { v4 as uuid } from 'uuid'
import { Message } from 'components/shared/Message'
import { isEmpty } from 'helpers/isEmpty'
import { STTitle } from 'components/shared/styled'
import Link from 'next/link'

export default function Transaction() {
  const [tableData, setTableData] = useState([])
  const [tableColumns, setTableColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const { transactionData } = useTransactionContext()

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
    const tableData = [{ ...unusedKeys, ...restKeys }]

    setTableData(tableData)
    setTableColumns(
      Object.keys(tableData[0]).map((key) => ({
        title: key.toUpperCase().replace('_', ' '),
        dataIndex: key,
        key: key,
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
          key: key,
        }
      })

      setTableData(tableData)
      setTableColumns(tableColumns)
      setRequestError(null)
    } catch (error) {
      console.log(error)

      setTableData([{}])
      setTableColumns([{}])
      setRequestError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Link href="/dashboard">
        <a title="back to dashboard">
          <LeftOutlined style={{ fontSize: '3rem', padding: '1rem' }} />
        </a>
      </Link>

      {requestError && (
        <Message color="#fff" bgColor="#a3f">
          Error {requestError.code}: {requestError.message}. Please try again.
        </Message>
      )}

      {tx_hash && (
        <>
          <STTitle color="#fff">Transaction Hash: {tx_hash}</STTitle>
          <Table
            dataSource={tableData}
            columns={tableColumns}
            loading={loading}
            style={{ width: '90%', margin: 'auto' }}
            scroll={{ x: true }}
            pagination={false}
          />
        </>
      )}
    </section>
  )
}