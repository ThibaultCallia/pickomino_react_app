import { PlainPlayer } from "../Players/Player.types"
import { PlainTile } from "../../components"

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
}
