import { STButton } from "components/shared/styled";

export function DeleteRowButton ({ handleDeleteRow }) {
	return (
		<STButton bgColor="#f23" bgColorHover="#f80" onClick={handleDeleteRow}>
      delete
		</STButton>
	);
}
