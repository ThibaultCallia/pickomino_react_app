import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {PlainGameState} from './Game.types'
import {createInitialGameState} from './GameStateObject'
import {createPlayerArray} from '../Players/playerState'
import {createUniqueNameArray} from '../../helpers'
import { DieInterface, PlainTile } from '../../components'



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
            state.gameStatus = "playing";
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
        returnTile: (state) =>{
          const disabledHighestTile = () => {
            let highestNonDisabledTile: PlainTile | null = null;
            let highestTileIndex = -1;
          
            state.tilesArray.forEach((tile, index) => {
              if (!tile.disabled && (!highestNonDisabledTile || tile.value > highestNonDisabledTile.value)) {
                highestNonDisabledTile = tile;
                highestTileIndex = index;
              }
            });
            state.tilesArray[highestTileIndex].disabled = true;
          };
          const tile = state.playerArray[state.currentPlayersTurn].collectedTiles.pop();

          if(tile){
            // ---------------------------------------------- Put tile on board
            // Find the index of the first tile with a value higher than the returned tile
            const insertIndex = state.tilesArray.findIndex((t) => t.value > tile.value);
            // Insert the tile at the calculated index
            if (insertIndex !== -1) {
              state.tilesArray.splice(insertIndex, 0, {...tile, selected: false});
            } else {
              state.tilesArray.push({...tile, selected: false});
            }
            // ---------------------------------------------- Validate whether the highest tile should be disabled
            let highestNonDisabledTileValue: number | null = null;
            // Find the highest non-disabled tile value
            state.tilesArray.forEach((tile) => {
              if (!tile.disabled && (!highestNonDisabledTileValue || tile.value > highestNonDisabledTileValue)) {
                highestNonDisabledTileValue = tile.value;
              }
            });

            if( tile.value !== highestNonDisabledTileValue){
            disabledHighestTile();
            }
          } else{
            disabledHighestTile();
          };
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
        },
        setCurrentDiceRoll: (state, {payload: dice}: PayloadAction<DieInterface[]>) => {
          state.playerArray[state.currentPlayersTurn].currentDiceRoll = dice;
        },
        resetCurrentDiceRoll: (state) => {
          state.playerArray.map(player => player.currentDiceRoll = [])
        },
        toggleDiceTotal: (state) => {
          state.settings.selectedDiceTotal = !state.settings.selectedDiceTotal;
        },

    },
})

export const { startGame, nextPlayerTurn, takeTile, toggleDiceTotal, stealTile, addSelectedDice, resetSelectedDice, setCurrentDiceRoll, resetCurrentDiceRoll, returnTile } = gameSlice.actions
export default gameSlice.reducer