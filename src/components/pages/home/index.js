import styled from 'styled-components'
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
]

const Home = () => {
  return (
    <Wrapper>
      <Table data={Transactions} config={Config} />
    </Wrapper>
  )
}

export default Home
