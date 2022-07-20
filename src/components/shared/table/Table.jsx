import { TableRow } from './table-row/TableRow'
import { TableHeaderItem } from './table-header-item/TableHeaderItem'

export function Table({ data, config }) {
  const totalPrice = data.reduce(
    (total, product) => total + Number(product.value),
    0
  )
  const totalColumns = Object.keys(data[0]).length
  console.log(totalColumns)
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
          <TableRow itemData={item} config={config} />
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
