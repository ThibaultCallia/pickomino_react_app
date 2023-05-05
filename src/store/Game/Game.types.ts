import { type PlainTile, type DieInterface } from '../../components'
import { type PlainPlayer } from '../Players/Player.types'

export interface PlainGameState {
  gameId: string
  playerArray: PlainPlayer[]
  tilesArray: PlainTile[]
  currentRound: number
  currentPlayersTurn: number
  currentPlayerId: string
  gameStatus: string
  settings: {
    selectedDiceTotal: boolean
  }
  dice: {
    currentlySelectedDice: DieInterface[]
    currentDiceRoll: DieInterface[]
  }
}
