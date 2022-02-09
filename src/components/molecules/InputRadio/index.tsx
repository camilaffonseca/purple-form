import styled from '@xstyled/styled-components'

import { Box } from 'components/atoms/Box'
import { Input } from 'components/atoms/Input'

const NewInput = styled(Input)`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 0.75em;
    height: 0.75em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);

    background-color: primary;
    cursor: pointer;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
`

type InputRadioProps = {
  name: string
  optionId: number
  label: string
  value: string | number
  required: boolean
  disabled: boolean
}

const InputRadio = ({
  name,
  label,
  optionId,
  value,
  required,
  disabled,
  ...props
}: InputRadioProps) => (
  <Box h='30px' flexDirection='row' alignItems='center' gap={2}>
    <NewInput
      disabled={disabled}
      name={name}
      id={String(optionId)}
      type='radio'
      required={required}
      value={value}
      {...props}
    />
    <label htmlFor={String(optionId)}>{label}</label>
  </Box>
)

export { InputRadio }
