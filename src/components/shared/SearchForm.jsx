import { SearchOutlined } from '@ant-design/icons'
import { STIconBtn } from 'components/shared/styled'
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
      <STIconBtn>
        <SearchOutlined />
      </STIconBtn>
    </STForm>
  )
}
