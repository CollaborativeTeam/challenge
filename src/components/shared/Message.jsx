import styled from 'styled-components'

export function Message({ children, bgColor, color }) {
  const STH3 = styled.h3`
    font-size: 1.5rem;
    padding: 1rem;
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
  `

  return (
    <STH3 color={color} bgColor={bgColor}>
      {children}
    </STH3>
  )
}
