export function TableRow({ itemData, config }) {
  return (
    <tr>
      {config.map((obj) => (
        <td>{itemData[obj.dataIndex]}</td>
      ))}
    </tr>
  )
}
