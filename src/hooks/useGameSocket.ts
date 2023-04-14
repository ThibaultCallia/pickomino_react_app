import { useState, useEffect } from "react"
import socket from "../socket" // Update the path to your socket instance
import { GameActionPayload } from "./"
import { PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { PlainGameState } from "../store/Game/Game.types"
import { setRoomId, setMaxPlayers, setPlayersJoined } from "../store/Room/roomSlice"
import { updatePlayersInfo } from "../store/Game/gameSlice"

const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)

    useEffect(() => {
        const handleRoomCreated = ({ roomCode, maxPlayers }: { roomCode: string; maxPlayers: number }) => {
            setRoomCode(roomCode)
            dispatch(setRoomId(roomCode));
            dispatch(setMaxPlayers(maxPlayers));
            dispatch(setPlayersJoined(1));
            // Also update game state with room code and player info (max and current players)
            
        }

        const handleRoomJoined = ({ roomCode, playersJoined, maxPlayers }: { roomCode: string; playersJoined: number, maxPlayers:number  }) => {
            setRoomCode(roomCode);
            dispatch(setRoomId(roomCode));
            dispatch(setPlayersJoined(playersJoined));
            dispatch(setMaxPlayers(maxPlayers));
            // Create player name and id -> FOR THE GAME not the room?
            // Also update game state with room code and player info (max and current players)
            
          };

        const PlayerJoinedListener = (data : {maxPlayers: number, playersJoined:number}) => {
        socket.on("player-joined", ({ playersJoined }: { playersJoined: number }) => {
            dispatch(setPlayersJoined(playersJoined));
            const maxPlayers = data.maxPlayers;
            console.log('playerJoined');
            dispatch(updatePlayersInfo({ maxPlayers, playersJoined }));
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
            PlayerJoinedListener(data);
        })
        socket.on("room-joined", (data)=>{
            handleRoomJoined(data);
            PlayerJoinedListener(data);
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
