import { useState } from 'react'
import { TableRow } from './table-row/TableRow'
import { TableHeaderItem } from './table-header-item/TableHeaderItem'
import { DeleteRowButton } from './delete-row-button/DeleteRowButton'

export function Table({ rowsData, config }) {
  const [data, setData] = useState(rowsData)
  const totalPrice = data.reduce(
    (total, product) => total + Number(product.value),
    0
  )
  const totalColumns = Object.keys(data[0]).length
  console.log(totalColumns)

  const deleteRow = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id))
  }
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {config.map((obj) => (
            <TableHeaderItem title={obj.title} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow
            itemData={item}
            config={config}
            handleDeleteRow={() => deleteRow(item.id)}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={totalColumns - 1}>Total value</td>
          <td>{totalPrice.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  )
}
