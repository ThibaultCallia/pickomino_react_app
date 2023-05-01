// INTERFACES
export interface DieInterface {
  value: number
  face: string
  selected: boolean
}

export interface DieProps {
  die: string
  onClick?: (value: string) => void
  selected: boolean
}
