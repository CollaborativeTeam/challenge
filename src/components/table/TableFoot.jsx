export function TableFoot({ data, config }) {
  const totalPrice = data.reduce(
    (total, product) => total + Number(product.value),
    0
  )
  const totalColumns = config.length
  return (
    <tfoot>
      <tr>
        <td colSpan={totalColumns - 1}>Total value</td>
        <td>{totalPrice.toFixed(2)}</td>
      </tr>
    </tfoot>
  )
}
