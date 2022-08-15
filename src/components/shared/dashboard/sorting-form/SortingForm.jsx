import { FilterOutlined } from '@ant-design/icons'
import { v4 as uuid } from 'uuid'
import { IconBtn } from '../../generics/IconBtn/IconBtn'
import { STFlex } from '../../generics/styled/styled'

export function SortingForm({ handleOnChange, handleSort, sortingValues }) {
  return (
    <STFlex flexDir="column" alItems="center" justCont="center">
      <label htmlFor="sort-option">Sort by:</label>
      <select onChange={handleOnChange} name="sort-option" id="sort-option">
        {sortingValues.map((value) => (
          <option key={uuid()} value={value}>
            {value.replace('_', ' ')}
          </option>
        ))}
      </select>

      <IconBtn handleClick={handleSort}>
        <FilterOutlined />
      </IconBtn>
    </STFlex>
  )
}
