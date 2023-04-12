import { useState, useEffect } from "react"
import socket from "../socket" // Update the path to your socket instance
import { GameActionPayload } from "./"
import { PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { PlainGameState } from "../store/Game/Game.types"
import { setRoomId, setMaxPlayers, setPlayersJoined } from "../store/Room/roomSlice"

const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)

    useEffect(() => {
        const handleRoomCreated = ({ roomCode, maxPlayers }: { roomCode: string; maxPlayers: number }) => {
            setRoomCode(roomCode)
            dispatch(setRoomId(roomCode));
            dispatch(setMaxPlayers(maxPlayers));
            dispatch(setPlayersJoined(1));
        }

        const handleRoomJoined = ({ roomCode, playersJoined }: { roomCode: string; playersJoined: number }) => {
            setRoomCode(roomCode);
            dispatch(setRoomId(roomCode));
            dispatch(setPlayersJoined(playersJoined));
          };

        const handleGameStart = () => {
            console.log("Game started")
        }

        const handleGameAction = ({ type, payload }: GameActionPayload) => {
            console.log("Game action:", type, payload)
            dispatch({ type, payload })
        }
        
        

        socket.on("room-created", handleRoomCreated)
        socket.on("room-joined", handleRoomJoined)
        socket.on("game-start", handleGameStart)
        socket.on("game-action", handleGameAction)
        


        return () => {
            socket.off("room-created", handleRoomCreated)
            socket.off("room-joined", handleRoomJoined)
            socket.off("game-start", handleGameStart)
            socket.off("game-action", handleGameAction)
            
        }
    }, [])

    const createRoom = (roomName: string, roomPass: string, noOfPlayers:number): Promise<string> => {
        
        return new Promise((resolve, reject) => {
            socket.emit("create-room", { roomName, roomPass, noOfPlayers }, (roomCode: string) => {
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

    const setInitialState = (initialState: PlainGameState) => {
        dispatch({ type: "game/setInitialState", payload: initialState });
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
