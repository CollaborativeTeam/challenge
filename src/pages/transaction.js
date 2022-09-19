import { useEffect, useState } from 'react'
import { useTransactionContext } from 'context/TransactionContext'
import { getTransactionData } from 'services/getTransactionData'
import { LeftOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { v4 as uuid } from 'uuid'
import { Message } from 'components/shared/Message'
import { STTitle } from 'components/shared/styled'
import Link from 'next/link'

export default function Transaction() {
  const { transactionData } = useTransactionContext()
  const { unusedKeys, ...restKeys } = transactionData

  const [tableData, setTableData] = useState([{ ...unusedKeys, ...restKeys }])
  const [tableColumns, setTableColumns] = useState(
    Object.keys(tableData[0]).map((key) => ({
      title: key.toUpperCase().replace('_', ' '),
      dataIndex: key,
      key: key,
    }))
  )
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const tx_hash = transactionData.tx_hash || tableData[0].tx_hash

  const handleTransactionDataReq = async () => {
    setLoading(true)
    try {
      const { data: requestData } = await getTransactionData(
        localStorage.getItem('tx_hash')
      )

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

  useEffect(() => {
    if (tx_hash) localStorage.setItem('tx_hash', tx_hash)

    if (Object.keys(tableData[0]).length === 0) {
      handleTransactionDataReq()
    }
  }, [])

  return (
    <article>
      <Link href="/dashboard">
        <a title="back to dashboard">
          <LeftOutlined style={{ fontSize: '3rem', padding: '1rem' }} />
        </a>
      </Link>

      <STTitle color="#fff">Transaction Hash: {tx_hash}</STTitle>

      {requestError && (
        <Message color="#fff" bgColor="#a3f">
          Error {requestError.code}: {requestError.message}. Please try again.
        </Message>
      )}

      <Table
        dataSource={tableData}
        columns={tableColumns}
        loading={loading}
        style={{ width: '90%', margin: 'auto' }}
        scroll={{ x: true }}
        pagination={false}
      />
    </article>
  )
}
