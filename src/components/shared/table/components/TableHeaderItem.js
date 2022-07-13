import styled from 'styled-components'

import { globalStyles } from '../../../../styles/constants'
import { darkTheme } from '../../../../styles/theme'

const STH = styled.th`
  font-weight: normal;
  padding: ${globalStyles.smSpacing};
  color: ${darkTheme.primary};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  :not(:last-of-type) {
    border-right: 1px solid white;
  }
  :first-of-type {
    width: 1%;
    white-space: nowrap;
  }
`

const TableHeaderItem = ({ item }) => {
  return <STH>{item.title}</STH>
}

export default TableHeaderItem
