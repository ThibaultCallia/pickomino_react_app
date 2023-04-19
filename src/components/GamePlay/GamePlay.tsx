import { Stack, Text, useDisclosure, Box } from "@chakra-ui/react"
import { Board } from "../Board"
import { GameOverModal } from "../GameOverModal"
import { PlayerInfo } from "../PlayerInfo"
import { RollDice } from "../RollDice"
import socket from "../../socket"
import { RootState } from "../../store"
import { useSelector } from "react-redux"

function GamePlay() {
    // HOOKS
    const { isOpen, onClose } = useDisclosure()

    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    const isCurrentUserPlaying =
        socket.id === currentPlayerId && gameStatus === "playing"
    const currenPlayerName = useSelector(
        (state: RootState) =>
            state.game.playerArray.find(
                (player) => player.id === currentPlayerId
            )?.name
    )
    // FUNCTIONS

    // RENDER
    return (
        <>
            <PlayerInfo />
            <Board />
            <Stack spacing={2}>
                <Box backgroundColor={"hsl(46, 83%, 61%)"} mb={3}>
                    <Text fontWeight={"bolder"} textAlign="center" fontSize={"xl"}>
                        {`${
                            isCurrentUserPlaying ? "Your" : `${currenPlayerName}'s`
                        } turn`}
                    </Text>
                </Box>
                <RollDice />
            </Stack>
            {/* <button onClick={onOpen}>winner modal test</button> */}
            <GameOverModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default GamePlay