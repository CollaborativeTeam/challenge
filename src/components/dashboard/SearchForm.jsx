import { SearchOutlined } from '@ant-design/icons'
import { IconBtn } from 'components/shared/IconBtn'
import { STForm, STSpan } from 'components/shared/styled'
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
        <SearchOutlined />
      </IconBtn>
    </STForm>
  )
}
