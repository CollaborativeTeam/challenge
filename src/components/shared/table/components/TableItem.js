import styled from 'styled-components'

import { globalStyles } from '../../../../styles/constants'
import { darkTheme } from '../../../../styles/theme'

const TableItem = ({ item, config }) => {
  const STBodyTR = styled.tr`
    background-color: #121212;
  `
  const STD = styled.td`
    padding: ${globalStyles.smSpacing};
    border: 1px solid ${darkTheme.backgroundSecondary};
    font-size: 14px;
    color: white;
  `

  return (
    <STBodyTR>
      {config.map((c, idx) => (
        <STD key={idx}>{item[c.key]}</STD>
      ))}
    </STBodyTR>
  )
}

export default TableItem
