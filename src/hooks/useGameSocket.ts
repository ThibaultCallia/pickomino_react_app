import { useState, useEffect, useRef, useContext } from "react"
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
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { DisconnectedPlayerContext } from "../contexts"


const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)
    const gameState = useSelector((state: RootState) => state.game)
    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const isCurrentUserPlaying =
        socket.id === currentPlayerId

    const { setShowWaitingScreen} = useContext(DisconnectedPlayerContext);


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
            localStorage.setItem("playerId", socket.id);
            localStorage.setItem("roomCode", roomCode);
            // ROOM SLICE
            dispatch(setRoomId(roomCode))
            dispatch(setMaxPlayers(maxPlayers))
            dispatch(setPlayersJoined(1))
            // GAME SLICE
            dispatch(setInitialState(gameState))
            localStorage.setItem("roomCode", roomCode);
            localStorage.setItem("playerId", socket.id);
            localStorage.setItem("gameActive", "true");

            localStorage.setItem("previouslyDisconnected", "false");
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
            localStorage.setItem("playerId", socket.id);
            localStorage.setItem("roomCode", roomCode);
            localStorage.setItem("gameActive", "true");
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

        const handleSyncGameState = (gameState: PlainGameState) => {
            console.log('syncing game state');
            dispatch(setInitialState(gameState))
            
        };

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
        socket.on("sync-game-state", ({ gameState }) => {
            console.log('syncing game state');
            handleSyncGameState(gameState)
        });
        socket.on("player-disconnected", () => {
            setShowWaitingScreen(true);
        });
        socket.on("player-reconnected", () => {
            setShowWaitingScreen(false);
        });

        return () => {
            socket.off("room-created", handleRoomCreated)
            socket.off("room-joined", handleRoomJoined)
            socket.off("game-action", handleGameAction)
            socket.off("sync-game-state", handleSyncGameState)
            // socket.off("player-joined", handlePlayerJoined);
        }
    }, [])

    useEffect(() => {
        if(!isCurrentUserPlaying) return
        socket.emit("update-game-state", { roomCode, newGameState: gameState });
        console.log("game state updated");

    }, [gameState])

    
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

    const rejoinRoom = (playerId:string, roomCode:string) => {
        return new Promise((resolve, reject) => {
          socket.emit("rejoin-room", { playerId, roomCode }, (response:any) => {
            if (response.success) {
              resolve(response.roomData);
              localStorage.setItem("playerId", socket.id);
            } else {
              reject(response.message);
            }
          });
        });
      };

    const sendPlayerAction = (type: string, payload: any) => {
        console.log('send player action called');
        socket.emit("game-action", { type, payload })
        
    }
    const endTurn = () => {
        socket.emit("end-turn", { roomCode });
    };

    return { roomCode, createRoom, joinRoom, sendPlayerAction, endTurn, rejoinRoom }
}

export default useGameSocket
