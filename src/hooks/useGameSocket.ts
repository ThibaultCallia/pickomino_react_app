import { useState, useEffect, useRef } from "react"
import socket from "../socket" // Update the path to your socket instance
import { GameActionPayload } from "./"
import { PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { PlainGameState } from "../store/Game/Game.types"
import {
    setRoomId,
    setMaxPlayers,
    setPlayersJoined,
} from "../store/Room/roomSlice"
import {
    setInitialState,
    updatePlayerIds,
    setCurrentDiceRoll,
    addSelectedDice,
    takeTile,
    stealTile,
    returnTile,
    nextPlayerTurn,
    resetSelectedDice,
    resetCurrentDiceRoll,
} from "../store/Game/gameSlice"

import { createInitialGameState } from "../store/Game/GameStateObject"

const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)

    useEffect(() => {
        if (!socket) return

        const handleRoomCreated = ({
            roomCode,
            maxPlayers,
            gameState,
        }: {
            roomCode: string
            maxPlayers: number
            gameState: PlainGameState
        }) => {
            setRoomCode(roomCode)
            // ROOM SLICE
            dispatch(setRoomId(roomCode))
            dispatch(setMaxPlayers(maxPlayers))
            dispatch(setPlayersJoined(1))
            // GAME SLICE
            dispatch(setInitialState(gameState))
        }

        const handleRoomJoined = ({
            roomCode,
            playersJoined,
            maxPlayers,
            gameState,
        }: {
            roomCode: string
            playersJoined: number
            maxPlayers: number
            gameState: PlainGameState
        }) => {
            setRoomCode(roomCode)
            // ROOM SLICE
            dispatch(setRoomId(roomCode))
            dispatch(setMaxPlayers(maxPlayers))
            // GAME SLICE
            dispatch(setInitialState(gameState))
        }

        const PlayerJoinedListener = (
            playersJoined: number,
            playerIds: string[]
        ) => {
            socket.on(
                "player-joined",
                ({
                    playersJoined,
                    playerIds,
                }: {
                    playersJoined: number
                    playerIds: string[]
                }) => {
                    // ROOM SLICE
                    dispatch(setPlayersJoined(playersJoined))
                    // GAME SLICE
                    dispatch(updatePlayerIds(playerIds))
                }
            )
        }

        const handleGameAction = (type: string, payload: any) => {
            switch (type) {
                case "nextPlayerTurn":
                    dispatch(nextPlayerTurn())
                    break
                case "selectDice":
                    dispatch(addSelectedDice(payload))
                    break
                case "resetSelectedDice":
                    dispatch(resetSelectedDice())
                    break
                case "rollDice":
                    dispatch(setCurrentDiceRoll(payload))
                    break
                case "resetCurrentDiceRoll":
                    dispatch(resetCurrentDiceRoll())
                    break
                case "takeTile":
                    dispatch(takeTile(payload))
                    break
                case "stealTile":
                    dispatch(stealTile(payload))
                    break
                case "returnTile":
                    dispatch(returnTile())
                    break
                default:
                    break
            }
        }

        // EVENT LISTENERS
        socket.on("room-created", (data) => {
            handleRoomCreated(data)
            PlayerJoinedListener(data.playerJoined, data.playerIds)
        })
        socket.on("room-joined", (data) => {
            handleRoomJoined(data)
            PlayerJoinedListener(data.playerJoined, data.playerIds)
        })

        socket.on("game-action", ({ type, payload }) => {
            handleGameAction(type, payload)
        })

        return () => {
            socket.off("room-created", handleRoomCreated)
            socket.off("room-joined", handleRoomJoined)
            socket.off("game-action", handleGameAction)
            // socket.off("player-joined", handlePlayerJoined);
        }
    }, [])

    const createRoom = (
        roomName: string,
        roomPass: string,
        noOfPlayers: number
    ): Promise<string> => {
        const initialGameState = createInitialGameState(noOfPlayers)

        return new Promise((resolve, reject) => {
            socket.emit(
                "create-room",
                { roomName, roomPass, noOfPlayers, initialGameState },
                (roomCode: string) => {
                    resolve(roomCode)
                }
            )
        })
    }

    const joinRoom = (roomName: string, roomPass: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            socket.emit(
                "join-room",
                { roomName, roomPass },
                (roomCode: string) => {
                    resolve(roomCode)
                }
            )
        })
    }

    const sendPlayerAction = (type: string, payload: any) => {
        socket.emit("game-action", { type, payload })
    }

    return { roomCode, createRoom, joinRoom, sendPlayerAction }
}

export default useGameSocket
