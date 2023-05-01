import { type ButtonProps } from '@chakra-ui/react'

export interface CustomButtonProps extends ButtonProps {
  isDisabled: boolean
  onClick: () => void
  children: React.ReactNode
}
