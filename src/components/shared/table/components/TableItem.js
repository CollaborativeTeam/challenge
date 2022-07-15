import styled from 'styled-components'

import { globalStyles } from '../../../../styles/constants'
import { darkTheme } from '../../../../styles/theme'

const STBodyTR = styled.tr`
  background-color: #121212;
`
const Std = styled.td`
  padding: ${globalStyles.smSpacing};
  border: 1px solid ${darkTheme.backgroundSecondary};
  font-size: 14px;
  color: white;
`
const TableItem = ({ item, config }) => {
  return (
    <STBodyTR>
      {config.map((c, idx) => (
        <Std key={idx}>{item[c.key]}</Std>
      ))}
    </STBodyTR>
  )
}

export default TableItem
