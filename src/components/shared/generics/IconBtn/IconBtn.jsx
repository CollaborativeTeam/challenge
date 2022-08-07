import styled from 'styled-components'

export function IconBtn({ children, handleClick }) {
  const STIconBtn = styled.button`
    text-align: center;
    height: auto;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    svg {
      margin: 0;
    }
  `
  return <STIconBtn onClick={handleClick}>{children}</STIconBtn>
}
