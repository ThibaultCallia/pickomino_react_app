import { PlainTile, DieInterface } from "../../components"

export interface PlainPlayer {
    name: string
    id: string
    collectedTiles: PlainTile[]
    isPlaying: boolean
    currentlySelectedDice: DieInterface[]
    currentDiceRoll: DieInterface[]
}
