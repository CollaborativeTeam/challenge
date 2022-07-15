export function Table({ data, config }) {
  const totalPrice = data.reduce(
    (total, product) => total + Number(product.value),
    0
  )

  return (
    <table>
      <thead>
        <tr>
          {config.keys.map((key) => (
            <td>{key}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.value}</td>
              <td>{product.from}</td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>Total value</td>
          <td colSpan={config.totalOfKeys - 1}>{totalPrice.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  )
}
