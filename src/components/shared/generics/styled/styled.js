import styled from 'styled-components'

export const STSpan = styled.span`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: 1.5rem;
  text-decoration: ${({ txtDeco }) => txtDeco};
`
export const STFlex = styled.div`
  display: flex;
  flex-direction: ${({ flexDir }) => flexDir};
  justify-content: ${({ justCont }) => justCont};
  align-items: ${({ alItems }) => alItems};
`
export const STWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  margin: auto;
`
export const STForm = styled.form`
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
