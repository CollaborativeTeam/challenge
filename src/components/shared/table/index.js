import styled from 'styled-components'

import { globalStyles } from '../../../styles/constants'
import { darkTheme } from '../../../styles/theme'
import TableHeaderItem from './components/TableHeaderItem'
import TableItem from './components/TableItem'

const STable = styled.table`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: ${globalStyles.borderRadius};
  overflow: hidden;
  padding: 20px;
`
const STHead = styled.thead`
  position: sticky;
  z-index: 100;
`
const STHeadTR = styled.tr`
  background-color: ${darkTheme.backgroundPrimary};
`

const STBody = styled.tbody`
  background-color: ${darkTheme.backgroundSecondary};
`

const TableComponent = ({ data, config }) => {
  return (
    <STable>
      <STHead>
        <STHeadTR>
          {config.map((item, idx) => (
            <TableHeaderItem item={item} key={idx} />
          ))}
        </STHeadTR>
      </STHead>

      <STBody>
        {data.map((item, idx) => (
          <TableItem key={idx} item={item} config={config} />
        ))}
      </STBody>
    </STable>
  )
}

export default TableComponent
