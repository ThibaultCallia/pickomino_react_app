import { nanoid } from "nanoid"
import { PlainPlayer } from "./Player.types"

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
    return Array.from({ length: numOfPlayers }, () => createPlayer())
}
