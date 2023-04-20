import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { PlainGameState } from "./Game.types"
import { createInitialGameState } from "./GameStateObject"
import { createPlayerArray } from "../Players/playerState"

import { DieInterface, PlainTile } from "../../components"

const initialState: PlainGameState = createInitialGameState(0)

/*
As the players' state is mostly updated in conjunction with the game state, 
a single GameState slice with player reducers is chosen 
to make it easier to manage state updates in a consistent manner.
*/

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setInitialState: (
            state,
            { payload: initialState }: PayloadAction<PlainGameState>
        ) => {
            return initialState
        },
        updatePlayerIds: (
            state,
            { payload: playerIds }: PayloadAction<string[]>
        ) => {
            playerIds.forEach((id, index) => {
                state.playerArray[index].id = id
            })
        },
        startGame: (state) => {
            state.currentPlayerId = state.playerArray[0]?.id
            state.gameStatus = "playing"
        },
        nextPlayerTurn: (state) => {
            const currentPlayerIndex = state.playerArray.findIndex(
                (player) => player.id === state.currentPlayerId
            )
            state.playerArray[currentPlayerIndex].isPlaying = false

            const nextPlayerIndex =
                (currentPlayerIndex + 1) % state.playerArray.length
            state.playerArray[nextPlayerIndex].isPlaying = true
            state.currentPlayerId = state.playerArray[nextPlayerIndex].id
        },
        addSelectedDice: (
            state,
            { payload: dice }: PayloadAction<DieInterface[]>
        ) => {
            state.dice.currentlySelectedDice.push(...dice)
        },
        resetSelectedDice: (state) => {
            state.dice.currentlySelectedDice = []
        },
        setCurrentDiceRoll: (
            state,
            { payload: dice }: PayloadAction<DieInterface[]>
        ) => {
            state.dice.currentDiceRoll = dice
        },
        resetCurrentDiceRoll: (state) => {
            state.dice.currentDiceRoll = []
        },

        takeTile: (state, { payload: tileValue }: PayloadAction<number>) => {
            const tileIndex = state.tilesArray.findIndex(
                (tile) => tile.value === tileValue
            )
            const tile = state.tilesArray[tileIndex]
            state.tilesArray.splice(tileIndex, 1)
            const currentPlayerIndex = state.playerArray.findIndex(
                (player) => player.id === state.currentPlayerId
            )
            state.playerArray[currentPlayerIndex].collectedTiles.push({
                ...tile,
                selected: true,
            })
        },
        stealTile: (state, { payload: playerId }: PayloadAction<string>) => {
            const stolenTile = state.playerArray
                .find((player) => player.id === playerId)
                ?.collectedTiles.pop()
            if (stolenTile) {
                const currentPlayerIndex = state.playerArray.findIndex(
                    (player) => player.id === state.currentPlayerId
                )
                state.playerArray[currentPlayerIndex].collectedTiles.push(
                    stolenTile
                )
            }
        },
        returnTile: (state) => {
            const disabledHighestTile = () => {
                let highestNonDisabledTile: PlainTile | null = null
                let highestTileIndex = -1

                state.tilesArray.forEach((tile, index) => {
                    if (
                        !tile.disabled &&
                        (!highestNonDisabledTile ||
                            tile.value > highestNonDisabledTile.value)
                    ) {
                        highestNonDisabledTile = tile
                        highestTileIndex = index
                    }
                })
                state.tilesArray[highestTileIndex].disabled = true
            }
            const currentPlayerIndex = state.playerArray.findIndex(
                (player) => player.id === state.currentPlayerId
            )
            
            const tile =
                state.playerArray[currentPlayerIndex].collectedTiles.pop()
            
            if (tile) {
                // ---------------------------------------------- Put tile on board
                // Find the index of the first tile with a value higher than the returned tile
                const insertIndex = state.tilesArray.findIndex(
                    (t) => t.value > tile.value
                )
                // Insert the tile at the calculated index
                if (insertIndex !== -1) {
                    state.tilesArray.splice(insertIndex, 0, {
                        ...tile,
                        selected: false,
                    })
                } else {
                    state.tilesArray.push({ ...tile, selected: false })
                }
                // ---------------------------------------------- Validate whether the highest tile should be disabled
                let highestNonDisabledTileValue: number | null = null
                // Find the highest non-disabled tile value
                state.tilesArray.forEach((tile) => {
                    if (
                        !tile.disabled &&
                        (!highestNonDisabledTileValue ||
                            tile.value > highestNonDisabledTileValue)
                    ) {
                        highestNonDisabledTileValue = tile.value
                    }
                })

                if (tile.value !== highestNonDisabledTileValue) {
                    disabledHighestTile()
                }
            } else {
                disabledHighestTile()
            }
        },

        toggleDiceTotal: (state) => {
            state.settings.selectedDiceTotal = !state.settings.selectedDiceTotal
        },
    },
})

export const {
    setInitialState,
    startGame,
    nextPlayerTurn,
    takeTile,
    toggleDiceTotal,
    stealTile,
    addSelectedDice,
    resetSelectedDice,
    setCurrentDiceRoll,
    resetCurrentDiceRoll,
    returnTile,
    updatePlayerIds,
} = gameSlice.actions
export default gameSlice.reducer
