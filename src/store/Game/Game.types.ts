import { PlainPlayer } from "../Players/Player.types"
import { PlainTile, DieInterface } from "../../components"

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
