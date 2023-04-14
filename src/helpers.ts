import { DieInterface, PlainTile } from "./components"
const createUniqueNameArray = (numOfNames: number) => {
    const adjectives = [
        "Celestial",
        "Galactic",
        "Nebulous",
        "Interstellar",
        "Astral",
        "Cosmic",
        "Starry",
        "Lunar",
        "Solar",
        "Seafaring",
        "Plundering",
        "Marauding",
        "Corsair",
        "Nautical",
        "ahoy, ",
        "Scurvy",
        "Pirate",
        "Salty",
    ]
    const nouns = [
        "Galaxy",
        "Nebula",
        "Spaceship",
        "Astronaut",
        "Black hole",
        "Comet",
        "Meteor",
        "Asteroid",
        "star",
        "Satellite",
        "rocket",
        "Buccaneer",
        "Cutlass",
        "Galleon",
        "Jolly Roger",
        "Plunder",
        "Scallywag",
        "Parrot",
        "Privateer",
        "Eye patch",
    ]
    const uniqueNames: Set<string> = new Set()

    while (uniqueNames.size < numOfNames) {
        const adjective =
            adjectives[Math.floor(Math.random() * adjectives.length)]
        const noun = nouns[Math.floor(Math.random() * nouns.length)]
        const name = `${adjective} ${noun}`

        uniqueNames.add(name)
    }
    return Array.from(uniqueNames)
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
    createUniqueNameArray,
    rollDice,
    canSelect,
    hasSelectableDice,
    totalDiceValue,
    includesRocket,
    finalRollFailed,
    totalPlanetsCollected,
}
