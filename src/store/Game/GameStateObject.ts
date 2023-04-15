import { nanoid } from "nanoid"
import defaultTilesSet from "./tiles.const"
import { PlainGameState } from "./Game.types"
import { createPlayerArray } from "../Players/playerState"

export const createInitialGameState = (noOfPlayers: number): PlainGameState => {
    return {
        gameId: nanoid(),
        playerArray: createPlayerArray(noOfPlayers),
        tilesArray: defaultTilesSet,
        currentRound: 0,
        currentPlayersTurn: 0,
        currentPlayerId: "",
        gameStatus: "not playing",
        settings: {
            selectedDiceTotal: false,
        },
    }
}
