import styled from 'styled-components'

import Table from '../../shared/table'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

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

const config = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Value',
    key: 'value',
  },
  {
    title: 'From',
    key: 'from',
  },
]

const Home = () => {
  return (
    <Wrapper>
      <Table data={Transactions} config={config} />
    </Wrapper>
  )
}

export default Home
