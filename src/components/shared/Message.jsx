import { STTitle } from 'components/shared/styled'

export function Message({ children, bgColor, color }) {
  return (
    <STTitle color={color} bgColor={bgColor}>
      {children}
    </STTitle>
  )
}
