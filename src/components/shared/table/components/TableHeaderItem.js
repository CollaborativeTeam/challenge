import styled from 'styled-components'

import { globalStyles } from '../../../../styles/constants'
import { darkTheme } from '../../../../styles/theme'

const Sth = styled.th`
  font-weight: normal;
  padding: ${globalStyles.smSpacing};
  color: ${darkTheme.primary};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;

  :not(:last-of-type) {
    border-right: 1px solid white;
  }
`

const TableHeaderItem = ({ item }) => {
  return <Sth>{item.title}</Sth>
}

export default TableHeaderItem
