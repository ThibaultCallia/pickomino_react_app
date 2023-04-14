import { nanoid } from "nanoid"
import { PlainPlayer } from "./Player.types"
import { createUniqueNameArray } from "../../helpers"

const createPlayer = (): PlainPlayer => {
    return {
        name: "",
        id: nanoid(),
        collectedTiles: [],
        isPlaying: false,
        currentlySelectedDice: [],
        currentDiceRoll: [],
    }
}

export const createPlayerArray = (numOfPlayers: number): PlainPlayer[] => {
    const players = Array.from({ length: numOfPlayers }, () => createPlayer())
    const playerNames = createUniqueNameArray(numOfPlayers)
    players.forEach((player, index) => {
        player.name = playerNames[index]
    })
    return players
}
