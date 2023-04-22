import { useEffect, useState } from "react"
import { Text, Box, Stack, useDisclosure, Button } from "@chakra-ui/react"

import { useDispatch, useSelector } from "react-redux"


import { RootState } from "../../store"

import { motion, useIsPresent } from "framer-motion"
import socket from "../../socket"

import { JoinRoomForm } from "../JoinRoomForm"
import { CreateRoomForm } from "../CreateRoomForm"
import { setInitialState, startGame } from "../../store/Game/gameSlice"
import { WaitingForPlayers } from "../WaitingForPlayers"
import { GamePlay } from "../GamePlay"
import { DisconnectedPlayer } from "../DisconnectedPlayer"
import { GameOverModal } from "../GameOverModal"
import { useGameSocket } from "../../hooks";
import { useGameSocketContext } from "../../contexts"
import { setRoomId } from "../../store/Room/roomSlice"

const MainView = () => {
    // USE STATES
    

    const board = useSelector((state: RootState) => state.game.tilesArray)
    const { onOpen, isOpen, onClose } = useDisclosure()
    const isPresent = useIsPresent()
    const roomCode = useSelector((state: RootState) => state.room.roomCode)
    const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers)
    const playersJoined = useSelector(
        (state: RootState) => state.room.playersJoined
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    const dispatch = useDispatch()
    const storedRoomCode:string|null = localStorage.getItem("roomCode");
    const storedPlayerId:string|null = localStorage.getItem("playerId");
    console.log(storedRoomCode, storedPlayerId);
    const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);
    const { rejoinRoom } = useGameSocketContext()

     
    

    useEffect(() => {
        if (board.filter((tile) => !tile.disabled).length === 0) {
            onOpen()
        }
    }, [board])

    useEffect(() => {
        if (playersJoined === maxPlayers) {
            dispatch(startGame())
        }
    }, [playersJoined])

    useEffect(() => {
        if (gameStatus === "playing") {
        
        }
    }, [gameStatus])

    
    // RENDER


    if(!hasCheckedLocalStorage && storedPlayerId && storedRoomCode && !roomCode) {
        console.log("rejoining room accessed");
        setHasCheckedLocalStorage(true);
         (async()=>{
            try{
                const roomData = await rejoinRoom( storedPlayerId, storedRoomCode);
                console.log(roomData);
                dispatch(setInitialState(roomData.gameState))
                dispatch(setRoomId(roomData.roomName))
                // PLAYER ID IS NOW NO LONGER SAME AS SOCKET ID -> CHANGE IT IN BACKEND

            } catch(err) {
                console.log(err);
            }
        })()
        
    }
    

    return (
        <>
        <Box
            py={2}
            minHeight="calc(100vh - 56px - 40px)"
            display="grid"
            alignItems="center"
            gap="2rem"
            width="90%"
            mx="auto"
            maxW={650}
        >
            {!roomCode ? (
                <>
                    <CreateRoomForm  />
                    <JoinRoomForm />
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{
                            scaleX: 0,
                            transition: { duration: 0.5, ease: "circOut" },
                        }}
                        exit={{
                            scaleX: 1,
                            transition: { duration: 0.5, ease: "circIn" },
                        }}
                        style={{ originX: isPresent ? 0 : 1 }}
                        className="privacy-screen"
                    />
                </>
            ) : playersJoined !== maxPlayers ? (
                <WaitingForPlayers />
            ) : (
                <GamePlay />
            )}
        </Box>
        <DisconnectedPlayer />
        <GameOverModal isOpen={isOpen} onClose={onClose} />
        {/* <button onClick={onOpen}>winner modal test</button> */}
        </>
    )
}

export default MainView
