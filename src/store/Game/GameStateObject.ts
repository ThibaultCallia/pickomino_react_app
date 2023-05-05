import { nanoid } from 'nanoid'

import { createPlayerArray } from '../Players/playerState'

import { type PlainGameState } from './Game.types'
import defaultTilesSet from './tiles.const'

export const createInitialGameState = (noOfPlayers: number): PlainGameState => {
  return {
    gameId: nanoid(),
    playerArray: createPlayerArray(noOfPlayers),
    tilesArray: defaultTilesSet,
    currentRound: 0,
    currentPlayersTurn: 0,
    currentPlayerId: '',
    gameStatus: 'not playing',
    settings: {
      selectedDiceTotal: false
    },
    dice: {
      currentlySelectedDice: [],
      currentDiceRoll: []
    }
  }
}
