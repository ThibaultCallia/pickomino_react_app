import { DieInterface, PlainTile } from "./components"

const shuffleArray = (array: { name: string; image: string }[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const rollDice = (numOfDice: number) => {
    let result = []
    let faces = ["1", "2", "3", "4", "5", "R"]
    for (let i = 0; i < numOfDice; i++) {
        const randomNum = Math.floor(Math.random() * 6) + 1
        result.push({
            value: randomNum,
            face: faces[randomNum - 1],
            selected: false,
        })
    }
    return result
}

const canSelect = (
    selectedDice: DieInterface[],
    currentDiceRoll: DieInterface[]
) => {
    if (selectedDice.length === 0) {
        return true
    }
    const selectedDie = currentDiceRoll.find((die) => die.selected)?.face
    if (selectedDice.every((die) => die.face !== selectedDie)) {
        return true
    }
    return false
}

const hasSelectableDice = (
    selectedDice: DieInterface[],
    currentRoll: DieInterface[]
): boolean => {
    const facesInArr1 = new Set(selectedDice.map((die) => die.face))
    return currentRoll.some((die) => !facesInArr1.has(die.face))
}

const totalDiceValue = (selectedDice: DieInterface[]) => {
    return selectedDice.reduce(
        (acc, die) => acc + (die.value === 6 ? 5 : die.value),
        0
    )
}

const includesRocket = (selectedDice: DieInterface[]) => {
    return selectedDice.some((die) => die.face === "R")
}

const finalRollFailed = (
    selectedDice: DieInterface[],
    currentRoll: DieInterface[],
    lowestTileOnBoard: number
) => {
    // Is it a final roll?
    if (!currentRoll.every((die) => die.value === currentRoll[0].value)) {
        return false
    }
    // ALL ROLLED DICE ARE SAME VALUE AT THIS POINT
    if (!includesRocket(selectedDice) && !includesRocket(currentRoll)) {
        return true
    }
    // Now check whether selecting the rocket // or the next die would have made a difference (vs least value tile )
    // OR OTHER PLAYERS' TILE)
    const toBeTotal = totalDiceValue(selectedDice) + totalDiceValue(currentRoll)
    if (toBeTotal < lowestTileOnBoard) {
        return true
    }
    return false
}

const totalPlanetsCollected = (collectedTiles: PlainTile[]) => {
    return collectedTiles.reduce((acc, tile) => acc + tile.points, 0)
}

export {
    shuffleArray,
    rollDice,
    canSelect,
    hasSelectableDice,
    totalDiceValue,
    includesRocket,
    finalRollFailed,
    totalPlanetsCollected,
}
