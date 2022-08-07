import styled from 'styled-components'

const SwitchContainer = styled.div`
  height: 5em;
  width: 12em;
  box-shadow: 0px 5px 5px 5px #071b2627;
  border-radius: 5em;
  position: relative;
`

const SwitchColor = styled.div`
  width: 11em;
  height: 4em;
  left: 0.5em;
  top: 0.5em;
  background: #1b1d29;
  border-radius: 5em;
  z-index: 20;
  position: absolute;
  transition: all 1.2s ease;
`

const Switch = styled.input`
  display: none;

  &:checked ~ label::before {
    opacity: 0;
  }

  &:checked ~ label::after {
    opacity: 1;
  }

  &:checked ~ label {
    transform: translatex(7em) rotatez(360deg);
  }

  &:checked ~ div {
    background: #00e676;
  }
`

const SwitchLabel = styled.label`
  height: 4em;
  width: 4em;
  position: absolute;
  box-shadow: 0px 0px 10px 2px #90a4ae27;
  border-radius: 50%;
  z-index: 99;
  background: #202231;
  left: 0.5em;
  top: 0.5em;
  cursor: pointer;
  transition: all 1s ease;

  &::before,
  &::after {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 900;
    font-size: 2.5em;
    position: absolute;
    left: 13px;
    color: #90a4ae;
    z-index: 40;
    top: 2px;
  }

  &::before {
    content: '✖';
  }

  &::after {
    content: '✓';
    opacity: 0;
  }
`

export function ToggleBar({}) {
  return (
    <SwitchContainer>
      <Switch type="checkbox" id="switch" />
      <SwitchColor />
      <SwitchLabel htmlFor="switch" />
    </SwitchContainer>
  )
}
