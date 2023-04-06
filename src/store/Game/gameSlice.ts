import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {PlainGameState} from './Game.types'
import {createInitialGameState} from './GameStateTest'
import {createPlayerArray} from '../Players/playerState'


const initialState: PlainGameState  = createInitialGameState();

/*
As the players' state is mostly updated in conjunction with the game state, 
a single GameState slice with player reducers is chosen 
to make it easier to manage state updates in a consistent manner.
*/

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<number>) => {
            const { payload: numOfPlayers } = action;
            state.playerArray = createPlayerArray(numOfPlayers);
          },
    },
})




