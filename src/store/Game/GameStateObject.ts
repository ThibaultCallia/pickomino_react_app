import { nanoid } from "nanoid"
import defaultTilesSet from "./tiles.const"
import { PlainGameState } from "./Game.types"

export const createInitialGameState = (): PlainGameState => {
    return {
        gameId: nanoid(),
        playerArray: [],
        tilesArray: defaultTilesSet,
        currentRound: 0,
        currentPlayersTurn: 0,
        gameStatus: "not playing",
        settings: {
            selectedDiceTotal: false,
        },
    }
}
