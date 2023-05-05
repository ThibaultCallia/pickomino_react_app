import { useEffect, useState } from "react"

import { Box, useDisclosure } from "@chakra-ui/react"
import { motion, useIsPresent } from "framer-motion"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"

import { useGameSocketContext } from "../../contexts"
import { type RootState } from "../../store"
import { setInitialState, startGame } from "../../store/Game/gameSlice"
import { setRoomId } from "../../store/Room/roomSlice"
import { CreateJoinRoom } from "../CreateJoinRoom"
import { DisconnectedPlayer } from "../DisconnectedPlayer"
import { GameOverModal } from "../GameOverModal"
import { GamePlay } from "../GamePlay"
import { NavBar } from "../NavBar"
import { WaitingForPlayers } from "../WaitingForPlayers"

const MainView = (): JSX.Element => {
    // USE STATES

    const board = useSelector((state: RootState) => state.game.tilesArray)
    const { onOpen, isOpen, onClose } = useDisclosure()
    const isPresent = useIsPresent()
    const roomCode = useSelector((state: RootState) => state.room.roomCode)
    const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers)
    const playersJoined = useSelector(
        (state: RootState) => state.room.playersJoined
    )

    const dispatch = useDispatch()
    const storedPlayerData: string | null = Cookies.get("PP_playerData") ?? null
    const parsedPlayerData = storedPlayerData
        ? JSON.parse(storedPlayerData)
        : null

    const storedRoomCode: string | null = parsedPlayerData?.roomCode ?? null
    const storedPlayerId: string | null = parsedPlayerData?.playerId ?? null
    const [hasCheckedCookie, setHasCheckedCookie] = useState(false)
    const { rejoinRoom } = useGameSocketContext()
    const imageUrls = [
        "/diceFaces/die1.svg",
        "/diceFaces/die2.svg",
        "/diceFaces/die3.svg",
        "/diceFaces/die4.svg",
        "/diceFaces/die5.svg",
        "/diceFaces/dieR.svg",
    ]

    // USE EFFECTS
    useEffect(() => {
        const preloadImages = () => {
            imageUrls.forEach((url) => {
                const img = new Image()
                img.src = url
            })
        }

        preloadImages()
    }, [])

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

    // RENDER

    if (!hasCheckedCookie && storedPlayerId && storedRoomCode && !roomCode) {
        setHasCheckedCookie(true)
        ;(async () => {
            try {
                const roomData = await rejoinRoom(
                    storedPlayerId,
                    storedRoomCode
                )

                dispatch(setInitialState(roomData.gameState))
                dispatch(setRoomId(roomData.roomName))
                // PLAYER ID IS NOW NO LONGER SAME AS SOCKET ID -> CHANGE IT IN BACKEND
            } catch (err) {
                console.log(err)
            }
        })()
    }

    return (
        <>
            <NavBar game={true} />
            <Box
                py={2}
                minHeight="calc(100vh - 56px - 40px)"
                display="grid"
                alignItems="center"
                gap="2rem"
                width="90%"
                mx="auto"
                maxW={680}
            >
                {!roomCode ? (
                    <>
                        <CreateJoinRoom />

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
            <button onClick={onOpen}>winner modal test</button>
        </>
    )
}

export default MainView
