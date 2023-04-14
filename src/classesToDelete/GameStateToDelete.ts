import { nanoid } from "nanoid"
import Player from "./PlayerToDelete"
import { createUniqueNameArray } from "../helpers"
import defaultTilesSet from "../store/Game/tiles.const"
import { PlainTile } from "../components"

class GameState {
    gameId: string = nanoid()
    playerArray: Player[]
    tilesArray: PlainTile[]
    currentRound: number = 0
    gameStatus: string = "playing"

    constructor(numOfPlayers: number) {
        this.playerArray = Array.from(
            { length: numOfPlayers },
            () => new Player()
        )
        this.tilesArray = defaultTilesSet
        this.createPlayerNames(numOfPlayers)
    }
    createPlayerNames(numOfPlayers: number) {
        const playerNames = createUniqueNameArray(numOfPlayers)

        this.playerArray.forEach((player, index) => {
            player.setPlayerName(playerNames[index])
        })
    }
}

export default GameState

// // ...
// public static get instance(): GameState {
//     if (!this._instance) {
//         this._instance = new GameState();
//     }
//     return this._instance;
// }
// // ...
