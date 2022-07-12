import React from 'react'
import styled from 'styled-components'

const TH = styled.th`
  display: table-cell;
  vertical-align: inherit;
  position: relative;
  color: #000000d9;
  font-weight: 500;
  text-align: left;
  background: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: 0.3s ease;
`

const TableHeaderItem = ({ item }) => {
  return <TH>{item.title}</TH>
}

export default TableHeaderItem
