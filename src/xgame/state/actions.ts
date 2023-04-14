import { createPlayerArray } from "../../store/Players/playerState"
import { createUniqueNameArray } from "../../helpers"
import { PlainGameState } from "../../store/Game/Game.types"

import { ActionFunction, ActionObject } from "xstate"
import { CustomActionObject } from "../types"



interface StartGameEvent {
  type: "START_GAME"
  numOfPlayers: number
}

const startGameExec: ActionFunction<PlainGameState, StartGameEvent> = (
  context,
  event
) => {
  const numOfPlayers = event.numOfPlayers
  const playerArray = createPlayerArray(numOfPlayers)
  const gameStatus = "playing"
  const playerNames = createUniqueNameArray(numOfPlayers)

  playerArray.forEach((player, index) => {
    player.name = playerNames[index]
  })

  playerArray[0].isPlaying = true

  context.playerArray = playerArray
  context.gameStatus = gameStatus
}

export const startGame: CustomActionObject<PlainGameState, StartGameEvent> = {
    type: "startGame",
    exec: (context, event) => {
      const numOfPlayers = event.numOfPlayers
      const playerArray = createPlayerArray(numOfPlayers)
      const gameStatus = "playing"
      const playerNames = createUniqueNameArray(numOfPlayers)
  
      playerArray.forEach((player, index) => {
        player.name = playerNames[index]
      })
  
      playerArray[0].isPlaying = true
  
      context.playerArray = playerArray
      context.gameStatus = gameStatus
    },
  }
