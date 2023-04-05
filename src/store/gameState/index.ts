import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

const gameStateSlice = createSlice({
    name: "gameState",
    initialState: {
        gameId: nanoid(),
        playerArray: [],
        tilesArray: [
            { value: 21, points: 1 },
            { value: 22, points: 1 },
            { value: 23, points: 1 },
            { value: 24, points: 1 },
            { value: 25, points: 2 },
            { value: 26, points: 2 },
            { value: 27, points: 2 },
            { value: 28, points: 2 },
            { value: 29, points: 3 },
            { value: 30, points: 3 },
            { value: 31, points: 3 },
            { value: 32, points: 3 },
            { value: 33, points: 4 },
            { value: 34, points: 4 },
            { value: 35, points: 4 },
            { value: 36, points: 4 },
        ],
        currentRound: 0,
        gameStatus: "playing",
    },
    reducers: {},
})
