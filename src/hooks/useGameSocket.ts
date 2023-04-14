import { useState, useEffect } from "react"
import socket from "../socket" // Update the path to your socket instance
import { GameActionPayload } from "./"
import { PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { PlainGameState } from "../store/Game/Game.types"
import { setRoomId, setMaxPlayers, setPlayersJoined } from "../store/Room/roomSlice"
import { setInitialState } from "../store/Game/gameSlice"

import { createInitialGameState } from "../store/Game/GameStateObject"

const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)

    useEffect(() => {
        const handleRoomCreated = ({ roomCode, maxPlayers, gameState }: { roomCode: string; maxPlayers: number, gameState:PlainGameState }) => {
            setRoomCode(roomCode)
            dispatch(setRoomId(roomCode));
            dispatch(setMaxPlayers(maxPlayers));
            dispatch(setPlayersJoined(1));
            // Also update game state with room code and player info (max and current players)
            dispatch(setInitialState(gameState));
        }

        const handleRoomJoined = ({ roomCode, playersJoined, maxPlayers, gameState }: { roomCode: string; playersJoined: number, maxPlayers:number, gameState:PlainGameState  }) => {
            setRoomCode(roomCode);
            dispatch(setRoomId(roomCode));
            dispatch(setMaxPlayers(maxPlayers));
            
            // Create player name and id -> FOR THE GAME not the room?
            // Also update game state with room code and player info (max and current players)
            dispatch(setInitialState(gameState));
          };

        const PlayerJoinedListener = (playersJoined:number) => {
        socket.on("player-joined", ({ playersJoined }: { playersJoined: number }) => {
            dispatch(setPlayersJoined(playersJoined));
            console.log('playerJoined');

        });
        };

        // const handlePlayerJoined = ({ playersJoined }: { playersJoined: number }) => {
        //     dispatch(setPlayersJoined(playersJoined));
        // };

        const handleGameStart = () => {
            console.log("Game started")
        }

        const handleGameAction = ({ type, payload }: GameActionPayload) => {
            console.log("Game action:", type, payload)
            dispatch({ type, payload })
        }
        
        
        

        socket.on("room-created", (data)=>{
            handleRoomCreated(data);
            PlayerJoinedListener(data.playerJoined);
        })
        socket.on("room-joined", (data)=>{
            handleRoomJoined(data);
            PlayerJoinedListener(data.playerJoined);
        })
        socket.on("game-start", handleGameStart)
        socket.on("game-action", handleGameAction)
        // socket.on("player-joined", handlePlayerJoined);


        return () => {
            socket.off("room-created", handleRoomCreated)
            socket.off("room-joined", handleRoomJoined)
            socket.off("game-start", handleGameStart)
            socket.off("game-action", handleGameAction)
            // socket.off("player-joined", handlePlayerJoined);
            
        }
    }, [])

    const createRoom = (roomName: string, roomPass: string, noOfPlayers:number): Promise<string> => {
        const initialGameState = createInitialGameState(noOfPlayers);
        // set gameState with initialGameState
        return new Promise((resolve, reject) => {
            socket.emit("create-room", { roomName, roomPass, noOfPlayers, initialGameState }, (roomCode: string) => {
                resolve(roomCode);

            });
        });
    };
    
    const joinRoom = (roomName: string, roomPass:string): Promise<string> => {
        return new Promise((resolve, reject) => {
            socket.emit("join-room", {roomName, roomPass}, (roomCode: string) => {
                resolve(roomCode);
                // create gamestate with that code?
            });
        });
    };
   
    const playerAction = (type: string, payload: any) => {
        if (roomCode) {
            socket.emit("game-action", { roomCode, action: { type, payload } })
        } else {
            console.error("No room code available")
        }
    }

    return { roomCode, createRoom, joinRoom, playerAction }
}

export default useGameSocket
