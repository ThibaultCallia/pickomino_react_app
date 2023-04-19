

import { useEffect, useState } from "react"
import { Text, Box, Stack, useDisclosure, Button } from "@chakra-ui/react"
import { RollDice } from "../RollDice"
import { PlayerInfo } from "../PlayerInfo"
import { useDispatch, useSelector } from "react-redux"

import { Board } from "../Board"
import { RootState } from "../../store"
import { GameOverModal } from "../GameOverModal"
import { motion, useIsPresent } from "framer-motion"
import socket from "../../socket"

import { JoinRoomForm } from "../JoinRoomForm"
import { CreateRoomForm } from "../CreateRoomForm"
import { startGame } from "../../store/Game/gameSlice"
import { WaitingForPlayers } from "../WaitingForPlayers"
import { GamePlay } from "../GamePlay"

const MainView = () => {
    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    
    const board = useSelector((state: RootState) => state.game.tilesArray)
    const { onOpen } = useDisclosure()
    const isPresent = useIsPresent()

    const roomCode = useSelector((state: RootState) => state.room.roomCode)
    const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers)
    const playersJoined = useSelector(
        (state: RootState) => state.room.playersJoined
    )
    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    
    const dispatch = useDispatch()

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
            console.log(`current player id: ${currentPlayerId}`)
            console.log(`current user id: ${socket.id}`)
        }
    }, [gameStatus])
    // RENDER

    return (
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
                    <CreateRoomForm setNumOfPlayers={setNumOfPlayers} />
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
    )
}

export default MainView
