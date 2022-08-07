import { FaSearch } from 'react-icons/fa'
import { IconBtn } from '../../generics/IconBtn/IconBtn'
import { STForm, STSpan } from '../../generics/styled/styled'

export function SearchForm({ handleSubmit, message, inputName }) {
  return (
    <STForm onSubmit={handleSubmit}>
      <label htmlFor={inputName}>
        <STSpan color="#fff">{message}</STSpan>
      </label>
      <input
        required
        minLength={8}
        type="text"
        name={inputName}
        id={inputName}
      />
      <IconBtn>
        <FaSearch />
      </IconBtn>
    </STForm>
  )
}
