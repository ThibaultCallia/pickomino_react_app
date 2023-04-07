import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {PlainGameState} from './Game.types'
import {createInitialGameState} from './GameStateObject'
import {createPlayerArray} from '../Players/playerState'
import {createUniqueNameArray} from '../../helpers'


const initialState: PlainGameState  = createInitialGameState();

/*
As the players' state is mostly updated in conjunction with the game state, 
a single GameState slice with player reducers is chosen 
to make it easier to manage state updates in a consistent manner.
*/

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, { payload: numOfPlayers }: PayloadAction<number>) => {
            state.playerArray = createPlayerArray(numOfPlayers);
            const playerNames = createUniqueNameArray(numOfPlayers);
            state.playerArray.forEach((player, index) => {
                player.name = playerNames[index];
            });
          },
        nextPlayerTurn: (state) => {
            state.currentPlayersTurn = (state.currentPlayersTurn + 1) % state.playerArray.length;
          },
        takeTile: (state, { payload : tileValue}: PayloadAction<number>) => {
            const tileIndex = state.tilesArray.findIndex(tile => tile.value === tileValue);
            const tile = state.tilesArray[tileIndex];
            state.tilesArray.splice(tileIndex, 1);
            state.playerArray[state.currentPlayersTurn].collectedTiles.push({...tile, selected: true});
          },
    },
})

export const { startGame, nextPlayerTurn, takeTile } = gameSlice.actions
export default gameSlice.reducer