import { DeleteRowButton } from '../delete-row-button/DeleteRowButton'

export function TableRow({ itemData, config, handleDeleteRow }) {
  return (
    <tr>
      {config.map((obj) => (
        <td key={Math.random()}>
          {obj.dataIndex !== 'delete' ? (
            itemData[obj.dataIndex]
          ) : (
            <DeleteRowButton handleDeleteRow={handleDeleteRow} />
          )}
        </td>
      ))}
    </tr>
  )
}
