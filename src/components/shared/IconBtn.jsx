import { STIconBtn } from 'components/shared/styled'

export function IconBtn({ children, handleClick }) {
  return <STIconBtn onClick={handleClick}>{children}</STIconBtn>
}
