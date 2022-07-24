import styled from 'styled-components'
import { TableFoot } from '../../shared/table/table-foot/TableFoot'
import { AddRowButton } from '../../shared/table/add-row-button/AddRowButton'
import { useState } from 'react'
import { Table } from '../../shared/table/Table'
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

// eslint-disable-next-line no-unused-vars
const Transactions = [
  {
    id: 1,
    value: '1.11',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    id: 2,
    value: '2.22',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    id: 3,
    value: '3.33',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    id: 4,
    value: '4.44',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
]

const Config = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
  },
]
let counter = 10

const Home = () => {
  const [data, setData] = useState(Transactions)
  const randomObject = {
    id: counter++,
    value: (Math.random() * 10).toFixed(2),
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  }
  const addRow = (data) => setData((prevData) => [...prevData, data])
  const deleteRow = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id))
  }

  return (
    <Wrapper>
      <Table
        rowsData={data}
        config={Config}
        footer={<TableFoot data={data} config={Config} />}
        handleDeleteRow={deleteRow}
      />
      <AddRowButton handleClick={() => addRow(randomObject)} />
    </Wrapper>
  )
}

export default Home
