import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {PlainGameState} from './Game.types'
import {createInitialGameState} from './GameStateObject'
import {createPlayerArray} from '../Players/playerState'
import {createUniqueNameArray} from '../../helpers'
import { DieInterface } from '../../components'


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
            state.playerArray[0].isPlaying = true;
          },
        nextPlayerTurn: (state) => {
            state.currentPlayersTurn = (state.currentPlayersTurn + 1) % state.playerArray.length;
            const currentPlayerIndex = state.playerArray.findIndex((player) => player.isPlaying);
            state.playerArray[currentPlayerIndex].isPlaying = false;
            state.playerArray[state.currentPlayersTurn].isPlaying = true;
          },
        takeTile: (state, { payload : tileValue}: PayloadAction<number>) => {
            const tileIndex = state.tilesArray.findIndex(tile => tile.value === tileValue);
            const tile = state.tilesArray[tileIndex];
            state.tilesArray.splice(tileIndex, 1);
            state.playerArray[state.currentPlayersTurn].collectedTiles.push({...tile, selected: true});
          },
        toggleDiceTotal: (state) => {
            state.settings.selectedDiceTotal = !state.settings.selectedDiceTotal;
          },
        stealTile: (state, {payload: playerId}: PayloadAction<string>) => {
          const stolenTile = state.playerArray.find(player => player.id === playerId)?.collectedTiles.pop();
          if(stolenTile){
            state.playerArray[state.currentPlayersTurn].collectedTiles.push(stolenTile);
          }
        },
        addSelectedDice: (state, {payload: dice}: PayloadAction<DieInterface[]>) => {
          state.playerArray[state.currentPlayersTurn].currentlySelectedDice.push(...dice);
        },
        resetSelectedDice: (state) => {
          state.playerArray.map(player => player.currentlySelectedDice = [])
        }
    },
})

export const { startGame, nextPlayerTurn, takeTile, toggleDiceTotal, stealTile, addSelectedDice, resetSelectedDice } = gameSlice.actions
export default gameSlice.reducer