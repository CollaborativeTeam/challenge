import React from 'react'

const TableItem = ({ item, config }) => {
  return (
    <tr>
      {config.map((c, idx) => (
        <td key={idx}>{item[c.key]}</td>
      ))}
    </tr>
  )
}

export default TableItem
