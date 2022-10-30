import { v4 as uuid } from "uuid";

import { TableHeaderItem } from "./TableHeaderItem";
import { TableRow } from "./TableRow";

export function Table ({ rowsData, config, handleDeleteRow, footer }) {
	return (
		<table>
			<thead>
				<tr>
					{config.map(({ dataIndex, title }) => (
						<TableHeaderItem key={uuid()} dataIndex={dataIndex} title={title} />
					))}
				</tr>
			</thead>
			<tbody>
				{rowsData.map((item) => (
					<TableRow
						key={uuid()}
						itemData={item}
						config={config}
						handleDeleteRow={() => handleDeleteRow(item.id)}
					/>
				))}
			</tbody>
			{footer}
		</table>
	);
}
