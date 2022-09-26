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
export const STIconBtn = styled.button`
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
export const STButton = styled.button`
  width: 150px;
  padding: 0.5rem 1.5rem;
  border: 2px solid #000;
  border-radius: 10px;
  transition: background-color 0.3s ease-out;

  font-size: 1.3rem;

  background-color: ${({ bgColor }) => bgColor || '#a3f'};
  color: ${({ color }) => color || '#fff'};

  &:hover {
    background-color: ${({ bgColorHover }) => bgColorHover || '#09f'};
  }
`
export const STTitle = styled.h3`
  margin: 1rem auto;
  font-size: 1.5rem;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`
