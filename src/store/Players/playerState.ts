import { PlainPlayer } from "./Player.types"
import { shuffleArray } from "../../helpers"

const createPlayer = (): PlainPlayer => {
    return {
        name: "",
        id: "",
        image: "",
        collectedTiles: [],
        isPlaying: false,
        currentlySelectedDice: [],
        currentDiceRoll: [],
    }
}

const characters = [
    { name: "Nebula Siren", image: "4" },
    { name: "Starfire Tempest", image: "3" },
    { name: "Davy Drones", image: "5" },
    { name: "Astro Beard", image: "2" },
    { name: "Will Burner", image: "6" },
    { name: "Planetary Pirate", image: "7" },
    { name: "Void Corsair", image: "1" },
]

export const createPlayerArray = (numOfPlayers: number): PlainPlayer[] => {
    const players = Array.from({ length: numOfPlayers }, () => createPlayer())
    const shuffledCharacters = shuffleArray(characters)

    return players.map((player, index) => {
        return {
            ...player,
            name: shuffledCharacters[index].name,
            image: shuffledCharacters[index].image,
        }
    })
}
