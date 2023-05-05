import { type PlainTile, type DieInterface } from '../../components'

export interface PlainPlayer {
  name: string
  id: string
  collectedTiles: PlainTile[]
  isPlaying: boolean
  currentlySelectedDice: DieInterface[]
  currentDiceRoll: DieInterface[]
  image: string
}
