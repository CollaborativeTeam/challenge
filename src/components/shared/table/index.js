import styled from 'styled-components'

import TableHeaderItem from './components/TableHeaderItem'
import TableItem from './components/TableItem'

const Table = styled.table`
  position: relative;
  transition: opacity 0.3s;
  padding: 42px 24px 50px;
  color: #000000d9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`

const TableComponent = ({ data, config }) => {
  return (
    <Table>
      <thead>
        <tr>
          {config.map((item, idx) => (
            <TableHeaderItem item={item} key={idx} />
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, idx) => (
          <TableItem key={idx} item={item} config={config} />
        ))}
      </tbody>
    </Table>
  )
}

export default TableComponent
