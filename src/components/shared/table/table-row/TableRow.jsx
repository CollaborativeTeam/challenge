import { DeleteRowButton } from '../delete-row-button/DeleteRowButton'

export function TableRow({ itemData, config, handleDeleteRow }) {
  return (
    <tr>
      {config.map((obj) =>
        obj.dataIndex !== 'delete' ? (
          <td>{itemData[obj.dataIndex]}</td>
        ) : (
          <DeleteRowButton handleDeleteRow={handleDeleteRow} />
        )
      )}
    </tr>
  )
}
