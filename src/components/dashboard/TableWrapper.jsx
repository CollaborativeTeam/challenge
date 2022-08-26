import { Table } from 'antd'
import { Message } from 'components/shared/Message'
import { Loader } from 'components/shared/Loader'

export function TableWrapper({
  loading,
  requestError,
  tableData,
  tableColumns,
}) {
  return (
    <div>
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
    </div>
  )
}
