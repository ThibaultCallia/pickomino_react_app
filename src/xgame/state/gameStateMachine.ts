import { createMachine } from "xstate"
import { createInitialGameState } from "../../store/Game/GameStateObject"
import { startGame } from "./actions"
import { GameActions } from "../types"

export const createGameStateMachine = () => {
    const initialState = createInitialGameState()

    const actions: GameActions = {
        startGame,
    }

    const gameStateMachine = createMachine(
        {
            id: "game",
            context: initialState,
            initial: "idle",
            states: {
                idle: {
                    on: {
                        START_GAME: {
                            target: "playing",
                            actions: ["startGame"],
                        },
                    },
                },
                playing: {
                    on: {
                        NEXT_PLAYER_TURN: {
                            actions: ["nextPlayerTurn"],
                        },
                        TAKE_TILE: {
                            actions: ["takeTile"],
                        },
                        RETURN_TILE: {
                            actions: ["returnTile"],
                        },
                        STEAL_TILE: {
                            actions: ["stealTile"],
                        },
                        ADD_SELECTED_DICE: {
                            actions: ["addSelectedDice"],
                        },
                        RESET_SELECTED_DICE: {
                            actions: ["resetSelectedDice"],
                        },
                        SET_CURRENT_DICE_ROLL: {
                            actions: ["setCurrentDiceRoll"],
                        },
                        RESET_CURRENT_DICE_ROLL: {
                            actions: ["resetCurrentDiceRoll"],
                        },
                        TOGGLE_DICE_TOTAL: {
                            actions: ["toggleDiceTotal"],
                        },
                        UPDATE_PLAYERS_INFO: {
                            actions: ["updatePlayersInfo"],
                        },
                    },
                },
            },
            
        },
        {
            actions,
        }
    )

    return gameStateMachine
}
