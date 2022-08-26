import { TableRow } from './TableRow'
import { TableHeaderItem } from './TableHeaderItem'

export function Table({ rowsData, config, handleDeleteRow, footer }) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {config.map(({ dataIndex, title }) => (
            <TableHeaderItem dataIndex={dataIndex} title={title} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsData.map((item) => (
          <TableRow
            itemData={item}
            config={config}
            handleDeleteRow={() => handleDeleteRow(item.id)}
          />
        ))}
      </tbody>
      {footer}
    </table>
  )
}
