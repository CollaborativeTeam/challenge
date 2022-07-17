import styled from 'styled-components'
// import { Table } from '../../shared/Table'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

// eslint-disable-next-line no-unused-vars
const Transactions = [
  {
    key: 1,
    id: 1,
    value: '1.11',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    key: 2,
    id: 2,
    value: '2.22',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    key: 3,
    id: 3,
    value: '3.33',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
  {
    key: 4,
    id: 4,
    value: '4.44',
    from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },
]

const Configuration = {
  keys: Object.keys(Transactions[0]),
  totalOfKeys: Object.keys(Transactions[0]).length,
}

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
  },
]
const Home = () => {
  return (
    <Wrapper>
      <Table dataSource={Transactions} columns={columns} />
      {/* <Table data={Transactions} config={Configuration} /> */}
    </Wrapper>
  )
}

export default Home
