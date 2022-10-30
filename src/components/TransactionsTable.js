import React from "react";
import Table from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { v4 } from "uuid";
import { Loader } from "./shared/Loader";

export function TransactionsTable({
	headers = [],
	rows = [],
	onRowClick,
	loading = false
}) {
	return (
		<Table
			style={{
				overflowY: "scroll",
				overflowX: "scroll",
				maxHeight: "400px",
				margin: "auto"
			}}
		>
			{
				loading
					? (
						<Loader color="#fff" />
					)
					: (
						<>
							<TableHead>
								<TableRow>
									<TableCell>DETAILS</TableCell>

									{headers.map((header) => (
										<>
											<TableCell>{header.title}</TableCell>
										</>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										key={v4()}
									>
										{onRowClick
											? (
												<TableCell>
													<Button onClick={() => onRowClick(row)}>
                            View details
													</Button>
												</TableCell>
											)
											: null}

										{headers.map((header) => {
											// console.log({
											//   'row[header.key]': row[header.key],
											//   'header.key': header.key,
											//   row,
											// })
											return (
												<>
													{typeof row[header.key] !== "object"
														? (
															<TableCell scope="row">{row[header.key]}</TableCell>
														)
														: null}
												</>
											);
										})}
									</TableRow>
								))}
							</TableBody>
						</>
					)}
		</Table>
	);
}
