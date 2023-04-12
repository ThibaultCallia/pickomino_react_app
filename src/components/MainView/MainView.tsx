import "../../styles/components/mainView.scss"

import { useEffect, useState } from "react"
import { Text, Box, Stack, useDisclosure } from "@chakra-ui/react"
import { RollDice } from "../RollDice"
import { PlayerInfo } from "../PlayerInfo"
import { useDispatch, useSelector } from "react-redux"
import { startGame } from "../../store/Game/gameSlice"
import { Board } from "../Board"
import { RootState } from "../../store"
import { GameOverModal } from "../GameOverModal"
import { motion, useIsPresent } from "framer-motion"
import socket from '../../socket';
import { useGameSocket } from '../../hooks';
import { JoinRoomForm } from "../JoinRoomForm"
import { CreateRoomForm } from "../CreateRoomForm"



const MainView = () => {
    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const dispatch = useDispatch()
    const currentPlayer = useSelector(
        (state: RootState) => state.game.currentPlayersTurn
    )
    const board = useSelector((state: RootState) => state.game.tilesArray)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isPresent = useIsPresent()

    const roomCode = useSelector((state: RootState) => state.room.roomCode);
    const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers);
    const playersJoined = useSelector((state: RootState) => state.room.playersJoined);

    
    
   
    // USE EFFECTS
    useEffect(() => {
        if (numOfPlayers) {
            socket.emit('startGame', numOfPlayers);
            // dispatch(startGame(numOfPlayers))
        }
    }, [numOfPlayers])

    useEffect(() => {
        if (board.filter((tile) => !tile.disabled).length === 0) {
            onOpen();
        }
    }, [board])

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
                    <JoinRoomForm/>
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
                <>
                    <Box>
                        <Text fontSize="xl" fontWeight="bold">
                            Waiting for players...
                        </Text>
                        <Text fontSize="lg">
                            {playersJoined}/{maxPlayers} players joined
                            
                        </Text>
                    </Box>
                </>
            ) : (
                <>
                    <PlayerInfo />
                    <Board />
                    <Stack spacing={2}>
                        <Text fontWeight={"bold"}>
                            Player {currentPlayer + 1}'s turn
                        </Text>
                        <RollDice />
                    </Stack>
                    <button onClick={onOpen}>winner modal test</button>
                    <GameOverModal isOpen={isOpen} onClose={onClose} />
                </>
            )}
        </Box>
    )
}

export default MainView
