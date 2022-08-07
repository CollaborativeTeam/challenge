import { FaFilter } from 'react-icons/fa'
import { IconBtn } from '../../generics/IconBtn/IconBtn'
import { STFlex } from '../../generics/styled/styled'

export function SortingForm({ handleOnChange, handleSort }) {
  return (
    <STFlex flexDir="column" alItems="center" justCont="center">
      <label htmlFor="sort-option">Sort by:</label>
      <select onChange={handleOnChange} name="sort-option" id="sort-option">
        <option value="timestamp">timestamp</option>
        <option value="gas_price">gas price</option>
      </select>

      <IconBtn handleClick={handleSort}>
        <FaFilter />
      </IconBtn>
      {/* <ToggleBar /> */}
    </STFlex>
  )
}
